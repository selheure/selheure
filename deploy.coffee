fs = require('fs')
spawn = require('child_process').spawn

installBotsPath = "tools/couchdb_install_bots/couchdb_install_bots.coffee"

# <utils>
execCommand = (cmd) ->
  args = cmd.split(" ")
  p = spawn(args[0], args[1..])
  p.stdout.pipe(process.stdout)
  p.stderr.pipe(process.stderr)

urlWithoutCredentials = (url) ->
  return url.replace(/\/\/.*@/, '\/\/')

isUrl = (url)->
  return (url[0..6] == 'http://' or url[0..7] == 'https://')

# </utils>

args = process.argv.slice(2)
if args.length < 2
  throw "Not enough arguments! Should be: coffee deploy.coffee url appName [instanceName]"
url = args[0]
appName = args[1]
if args.length > 2
  instanceName = args[2]

[_ign, serverUrl] = url.match(/^(http(?:s)?:\/\/[^\/]*)\//)
console.log serverUrl
for db in fs.readdirSync('dbs/')
  if db == '_users'
    realDbName = '_users'
  else
    realDbName = appName
    if instanceName?
      realDbName += '-' + instanceName
    if db != 'main'
      realDbName += '_' + db
  cmd = "kanso push dbs/#{db} #{serverUrl}/#{realDbName}"
  #execCommand(cmd)
  execCommand("coffee #{installBotsPath} dbs/#{db} #{serverUrl} #{appName} #{instanceName}")


