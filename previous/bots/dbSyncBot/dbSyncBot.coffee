dbConnector      = require('../../tools/dbForBots/db')
UsersDbWatcher   = require('./UsersDbWatcher')
PrivateDbWatcher = require('./PrivateDbWatcher')


serverUrl    = process.argv[2]
appName      = process.argv[3]
instanceName = process.argv[4]

authAndHost         = serverUrl.split('/')[2..][0]
[auth, hostAndPort] = authAndHost.split('@')
[user, password]    = auth.split(':')
[host, port]        = hostAndPort.split(':')

mainDbName = appName + "-" + instanceName

dbServer      = dbConnector(host, port)
privateDbName = mainDbName + '_private'

usersDb   = new UsersDbWatcher(  dbServer, mainDbName,    appName, user, password)
privateDb = new PrivateDbWatcher(dbServer, privateDbName, appName, user, password)

usersDb.watch(privateDb)
privateDb.watch(usersDb)