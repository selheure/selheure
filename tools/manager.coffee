format = require('util').format
exec   = require('child_process').exec
spawn  = require('child_process').spawn
Q      = require('q')
fs     = require('fs')
prompt = require('prompt')
crypto = require('crypto')
cradle = require('cradle')


PROD_DB_URL       = "http://db.lupolibero.org/lupolibero"
VAGRANT_INVENTORY = '.vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory'
VAGRANT_SSH_KEY   = '~/.vagrant.d/insecure_private_key'
VAGRANT_SSH_USER  = 'vagrant'

PASSWORD_PROMPT = {
  properties: {
    password: {
      hidden: true
      required: false
    }
  }
}
prompt.message = prompt.delimiter = ""

usage = (cmd)->
  unless cmd?
    console.log """Usage:
    help                              Display this message
    [prod] bots push [inventory]      Push the bots (and proxy) to env (or default)
    [prod] app push [env|url]         Push the app to url or the URL associated to
                                      env (or default)
    [prod] app init [env|url]         Replicate the production db to url and then
                                      push the app
    [prod] push [env|url]             bots push + app push
    [prod] init [env]                 bots push + app init
    [prod] encrypt                    Encrypt or reencrypts the .kansorc[_prod] file
    [prod] vhost domain[:port] [env]  Add a vhost entry in the _config database

    To deploy to production, prod argument must be present
    """

production = false
plusOneIfProd = (nb) ->
  return nb + (if production then 1 else 0)

lastArgOrDefault = (argNum) ->
  if process.argv.length > argNum
    return process.argv[argNum]
  else
    return "default"

urlWithoutCredentials = (url) ->
  return url.replace(/\/\/.*@/, '\/\/')

isUrl = (url)->
  return (url[0..6] == 'http://' or url[0..7] == 'https://')

decrypt = (text, pwd)->
  decipher = crypto.createDecipher('aes-256-cbc', pwd)
  dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8')
  return dec

encrypt = (text, pwd)->
  cipher = crypto.createCipher('aes-256-cbc', pwd)
  crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;

saveEnvsToDisk = (envs, filepath)->
  wstream = fs.createWriteStream(filepath)
  wstream.write('exports.env = {\n')
  for envName, env of envs
    wstream.write("  '" + envName + "': {\n")
    wstream.write("    db: '" + env.db + "'\n")
    wstream.write("  },\n")
  wstream.write("};")
  wstream.end()


encryptEnvs = (file)->
  getProdEnvs().then (envs)->
    prompt.start()
    prompt.get(PASSWORD_PROMPT, (err, result)->
      if result.password != ""
        for envName, env of envs
          envs[envName].db = encrypt(env.db, result.password)
      saveEnvsToDisk(envs, file)
    )


getProdEnvs = ->
  deferred = Q.defer()
  require('./.kansorc_prod').env
  prompt.start()
  console.log "opening .kansorc_prod"
  prompt.get PASSWORD_PROMPT, (err, result)->
    envs = require('./.kansorc_prod').env
    if result.password != ""
      for envName, env of envs
        envs[envName].db = decrypt(env.db, result.password)
        unless isUrl(envs[envName].db)
          deferred.reject(envs)
    deferred.resolve(envs)
  return deferred.promise

getEnvs = ->
  if production
    return getProdEnvs()
  else
    return Q.resolve(require('./.kansorc').env)

getUrlFromEnv = (envOrUrl) ->
  deferred = Q.defer()
  if isUrl(envOrUrl)
    return envOrUrl

  getEnvs().then (envs)->
    if envs and envOrUrl of envs
      deferred.resolve(envs[envOrUrl].db)
    else
      console.log format("invalid or not existing environment: %s", urlWithoutCredentials(envOrUrl))
      deferred.reject()
  return deferred.promise

copyFileSync = (srcFile, destFile) ->
  BUF_LENGTH = 64*1024
  buff = new Buffer(BUF_LENGTH)
  fdr = fs.openSync(srcFile, 'r')
  fdw = fs.openSync(destFile, 'w')
  bytesRead = 1
  pos = 0
  while bytesRead > 0
    bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw,buff,0,bytesRead)
    pos += bytesRead
  fs.closeSync(fdr)
  fs.closeSync(fdw)

callCommand = (cmd) ->
  deferred = Q.defer()
  args = cmd.split(" ")
  p = spawn(args[0], args[1..])

  #p.stdout.on('data', (data) ->
  #  console.log(data.toString())
  #)
  p.stdout.pipe(process.stdout)
  p.stderr.pipe(process.stderr)
  p.on('close', (code)  ->
    if code > 0
      deferred.reject()
    else
      deferred.resolve()
  )
  return deferred.promise


# Install bots files on the server fs
# and reload them
botsPush = (env) ->
  deferred = Q.defer()
  console.log "node manager.js bots push", env
  if production
    if fs.existsSync("ansible/production")
      inventory = "ansible/production"
  else if fs.existsSync("ansible/hosts")
    inventory = "ansible/hosts"
  else
    inventory = VAGRANT_INVENTORY
    ssh_key = VAGRANT_SSH_KEY
    user = VAGRANT_SSH_USER
  callCommand(
    "ansible-playbook ansible/site.yml -i " +
    inventory + " " +
    (if ssh_key then "--private-key=" + ssh_key + " " else '') +
    (if user then "-u " + user + " " else '') +
    "--limit " + env + " --tags deploy -K"
  ).then(->
    getUrlFromEnv(env).then (url)->
      callCommand(format("coffee bots/external_tools %s", url))
  )

# Reload the application in the db
appPush = (envOrUrl) ->
  deferred = Q.defer()
  getUrlFromEnv(envOrUrl).then (url)->
    console.log "node manager.js app push", urlWithoutCredentials(url)
    callCommand(format("kanso push %s", url))

# Clone the production db
appInit = (envOrUrl) ->
  deferred = Q.defer()
  getUrlFromEnv(envOrUrl).then (url)->
    console.log "node manager.js app init", urlWithoutCredentials(url)
    unless production
      callCommand(format("kanso replicate %s %s", PROD_DB_URL, url))

registerVhost = (env, domainName) ->
  getUrlFromEnv(env).then (dbUrl)->
    fs.readFile 'kanso.json', (err, data) ->
      if data
        ddoc = JSON.parse(data).name
        # extract dbName and serverUrl from dbURL
        [_ign, serverUrl, dbName] = dbUrl.match(/^(http(?:s)?:\/\/[^\/]*)\/(.*)/)
        vhostPath = '/' + dbName + '/_design/' + ddoc + '/_rewrite/'
        console.log "Installing vhost #{domainName}: #{vhostPath}"
        db = new(cradle.Connection)(serverUrl).database("_config")
        db.query({
          method: 'PUT'
          path: "vhosts/#{domainName}"
          body: vhostPath
        }, (err, res)->
          if err
            console.log("FAILED")
            console.log(err)
          else
            console.log("OK")
        )


#
# Command line split
#
if process.argv[2] == "prod"
  production = true

# node manager.js [help]
if (process.argv.length == 2 or process.argv.length == 3 and
  process.argv[2] == "help")
    usage()

# node manager.js bots push [env]
 # cp files to ansible/role/...
 # ansible inventory
else if process.argv[plusOneIfProd(2)] == "bots"
  if process.argv.length == plusOneIfProd(3)
    usage()
  else if process.argv[plusOneIfProd(3)] == "push"
    env = lastArgOrDefault(plusOneIfProd(4))
    botsPush(env)

# node manager.js app push [env|url]
 # kanso push url
else if process.argv[plusOneIfProd(2)] == "app"
  if process.argv.length == plusOneIfProd(3)
    usage()
  else
    envOrUrl = lastArgOrDefault(plusOneIfProd(4))
    if process.argv[plusOneIfProd(3)] == "push"
      appPush(envOrUrl)

# node manager.js app init [env|url]
 # kanso replicate prod url
 # node manager.js app push url
    else if process.argv[plusOneIfProd(3)] == "init"
      appInit(envOrUrl).then(-> appPush(envOrUrl))

# node manager.js push [env]
 # node manager.js bots push env
 # node manager.js app push url
else if process.argv[plusOneIfProd(2)] == "push"
  env = lastArgOrDefault(plusOneIfProd(3))
  botsPush(env).then(-> appPush(env))

# node manager.js init [env]
 # node manager.js bots push env
 # node manager.js app init env
else if process.argv[plusOneIfProd(2)] == "init"
  env = lastArgOrDefault(plusOneIfProd(3))
  botsPush(env).then(-> appPush(env))

# node manager.js encrypt
else if process.argv[plusOneIfProd(2)] == "encrypt"
  encryptEnvs(if production then '.kansorc_prod' else '.kansorc')

# node manager.js vhost domainname [env]
else if process.argv[plusOneIfProd(2)] == "vhost"
  if process.argv.length < plusOneIfProd(4)
    usage()
  else
    domainname = process.argv[plusOneIfProd(3)]
    env = lastArgOrDefault(plusOneIfProd(4))
    registerVhost(env, domainname)

process.on 'uncaughtException', (err) ->
  console.error('An uncaughtException was found, the program will end.')
  console.error(err)
  process.exit(1)
