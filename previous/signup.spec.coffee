class SignUpPage
  constructor: ->
    @name    = element By.name 'name'
    @pwd     = element By.name 'password'
    @confPwd = element By.name 'passwordconf'
    @email   = element By.name 'email'
    @tel     = element By.model 'user.tel'
    @localization = element By.name 'localization'
    path = '//div[contains(concat(" ",normalize-space(@class)," ")," modal ")]' +
           '//form//button[@type="submit"]'
    @validateButton = element By.xpath path
    @signupButton   = element By.xpath '//form/button[@type="submit"][2]'

  get: ->
    browser.get 'http://cric.selheure.couch:5984/'
    @signupButton.click()
    browser.getCurrentUrl()

  setName: (text) ->
    @name.sendKeys text
    @

  setPassword: (text) ->
    @pwd.sendKeys text
    @confPwd.sendKeys text
    @

  setEmail: (text) ->
    @email.sendKeys text
    @

  setTel: (text) ->
    @tel.sendKeys text
    @

  setLocalization: (text) ->
    @localization.sendKeys text
    @

  signUp: () ->
    @validateButton.click()
    @


describe 'Sign up form', ->
  it 'should allow user creation', ->
    page = new SignUpPage()
    url  = page.get()

    page
      .setName('toto')
      .setPassword('toto')
      .signUp()

    expect(browser.getCurrentUrl()).not.toEqual(url)