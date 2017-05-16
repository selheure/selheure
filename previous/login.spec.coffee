class Login
  constructor: ->
    @name        = element By.model 'user.name'
    @pwd         = element By.xpath '//form//input[@type="password"]'
    @loginButton = element By.xpath '//form/button[@type="submit"][1]'

  get: ->
    browser.get 'http://cric.selheure.couch:5984/'
    browser.getCurrentUrl()

  setName: (text) ->
    @name.sendKeys text
    @

  setPassword: (text) ->
    @pwd.sendKeys text
    @

  login: () ->
    @loginButton.click()
    @

module.exports = Login

describe 'Login', ->
  it 'should login user', ->
    login = new Login()
    url   = login.get()

    login
      .setName('toto')
      .setPassword('toto')
      .login()

    expect(browser.getCurrentUrl()).toEqual(url)