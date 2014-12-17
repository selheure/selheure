angular.module('login').
factory('login', ($q, $rootScope, $timeout, $http, User, db) ->
  login = {
    proxys: []
    currentUser: {
      name:     ''
      password: ''
      roles:    []
    }

    getPassword: ->
      if this.isConnected()
        return this.currentUser.password
      else
        return ''

    getName: ->
      if this.isConnected()
        if this.currentUser.name.indexOf(db.main.name + '.') == 0
          this.currentUser.name = this.currentUser.name[db.main.name.length+1..]
        return this.currentUser.name
      else
        return ''

    getFullyQualifiedName: (name) ->
      return db.main.name + '.' + name

    signIn: (username, password) ->
      defer = $q.defer()
      fullName = @getFullyQualifiedName(username)
      $http.post("/_session", {
        name:     fullName
        password: password
      }).then(
        (data)=> #Success
          data = data.data
          data['password'] = password
          @currentUser      = data
          $rootScope.$broadcast('SignIn', @getName() )
          $rootScope.$broadcast('SessionChanged', @getName())
          defer.resolve(data)
        ,(err)-> #Error
          console.log err
          defer.reject(err)
      )

      return defer.promise

    signUp: (user) ->
      defer = $q.defer()
      userData = {}
      userData[db.main.name] =
        name:           user.name
        email:          user.email
        tel:            user.tel
        localization:   user.localization
      fullName = @getFullyQualifiedName(user.name)
      # Create the user inside _users db
      $http.post('/_users/',{
        _id:       "org.couchdb.user:#{fullName}"
        name:      fullName
        type:      "user"
        roles:     []
        password:  user.password
        data:      userData
      }).then(
        (data)=> #Success
          @signIn(user.name, user.password).then(
            (data) -> #Success
              defer.resolve(data)
            ,(err) -> #Error
              defer.reject(err)
          )
        ,(err)-> #Error
          defer.reject(err)
      )
      return defer.promise

    signOut: ->
      defer = $q.defer()

      $http.delete('/_session').then(
        (data) => #Success
          data = data.data
          @currentUser = {
            name:     data.name
            password: ''
            roles:     data.roles
          }
          $rootScope.$broadcast('SignOut')
          $rootScope.$broadcast('SessionChanged', @getName())
          defer.resolve(data)
        ,(err) => #Error
          defer.reject(err)
      )

      return defer.promise

    getInfo: ->
      defer = $q.defer()

      $http.get('/_session').then(
        (data) => #Success
          data = data.data.userCtx
          @currentUser = data
          $timeout( =>
            $rootScope.$broadcast('SessionStart', @getName())
            $rootScope.$broadcast('SessionChanged', @getName())
            if @isConnected()
              $rootScope.$broadcast('SignIn', @getName())
            else
              $rootScope.$broadcast('SignOut')
          , 100)
          defer.resolve(data)
        ,(err) => #Error
          defer.reject(err)
      )

      return defer.promise

    isConnected: ->
      return this.currentUser.name? and this.currentUser.name != ''

    isValidated: ->
      return @hasRole(db.main.name)

    isAdmin: ->
      return @hasRole(db.main.name + "_admin")

    hasRole: (role) ->
      for piece in this.currentUser.roles || []
        if role == piece or piece == 'admin'
          return true
          break
      return false

    authorize: (name)->
      return this.getName() == name || this.hasRole(name)
  }

  $rootScope.$on('$routeChangeSuccess', ->
    $timeout( ->
      $rootScope.$broadcast('SessionChanged', login.getName())
      if login.isConnected()
        $rootScope.$broadcast('SignIn', login.getName())
      else
        $rootScope.$broadcast('SignOut', login.getName())
    ,200)
  )

  $rootScope.$on('SessionChanged', ($event, name)->
    if name == ''
      login.proxys = []
    else
      for role in login.currentUser.roles
        if login.proxys.indexOf(role) == -1
          User.get({
            key: role
          }).then(
            (data)-> #Success
              login.proxys.push(role)
          )
  )

  return login
)
