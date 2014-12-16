###
 # Usage: <script_name> path http[s]://<username>:<password>@<serverUrl> [appName] [instanceName]
 #           OR
 # Usage: <script_name> path default|production (taken from .kansorc) [appName] [instanceName]
 # get list of daemons from kanso.json
###

cradle   = require('cradle')
path     = require('path')
fs       = require('fs')
basePath = ""


isUrl = (url)->
  return (url[0..6] == 'http://' or url[0..7] == 'https://')


usage = "Usage: <script_name> path url|env [appName] [instanceName]"

args = process.argv.slice(2)
if args.length < 2
  console.error usage
  process.exit(1)
if not fs.existsSync(args[0])
  console.error "path '#{args[0]}' is incorrect"
  console.error usage
  process.exit(1)
basePath = path.resolve(args[0])
urlOrEnv = args[1]
bots     = require(path.join(basePath, 'kanso.json')).bots

if args.length >= 3
  appName = args[2]
  if args.length >= 4
    instanceName = args[3]

if isUrl(urlOrEnv)
  serverUrl = urlOrEnv
else
  krcPath = path.join(basePath, '.kansorc')
  console.log ".kansorc path: #{krcPath}"
  if fs.existsSync(krcPath)
    kansorc = require(krcPath).env
  if kansorc
    envName = urlOrEnv
    if kansorc[envName]?.db?
      serverUrl = kansorc[envName].db
    else
      console.error("#{envName}: not found in .kansorc or has not the property 'db'")
      console.error usage
      process.exit(1)
  else
    console.error('No .kansorc found')
    console.error usage
    process.exit(1)

if not bots
  console.log "No bot to install in #{basePath}"
  process.exit(0)

# get the address without the database name
serverUrl = serverUrl.match(/^http(?:s)?:\/\/.*\/?/)[0]

console.log "Installation of bots in " + serverUrl.replace(/\/\/.*@/, '\/\/') + "/_config db"

db = new(cradle.Connection)(serverUrl).database("_config")
for botName, bot of bots
  words = []
  for word in bot.split(' ')
    words.push(
      if fs.existsSync(word)
        path.resolve(word)
      else
        switch word
          when "_url"      then serverUrl
          when "_app"      then appName
          when "_instance" then instanceName
          else word
    )
  firstExt = words[0].match(/\.\w+$/)
  if firstExt?
    words.unshift(
      switch firstExt[0]
        when ".coffee" then "coffee"
        when ".js"     then "node"
        else ""
    )
  botCmd = words.join(' ')

  if appName?
    botName += "-" + appName
    if instanceName?
      botName += "-" + instanceName

  ( (name)->
    return db.query({
        method: 'PUT'
        path: "os_daemons/#{name}"
        body: botCmd
      }, (err, res)->
        if err
          console.log("#{name}: ERROR")
          console.log(err)
        else
          console.log("#{name}: INSTALLED")
    )
  )(botName)

