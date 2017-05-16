Login = require './login.spec'

class NewAnnouncePage
  constructor: ->
    @types        = element By.repeater '(key, label) in announceTypes'
    @category     = element By.options  'categories'
    @title        = element By.name     'title'
    @place        = element By.name     'place'
    @description  = element By.name     'message'
    @signupButton = element By.xpath '//form[@name="announceForm"]/button[@type="submit"]'

  get: ->
    browser.get 'http://cric.selheure.couch:5984/#/annonces/nouvelle'
    browser.getCurrentUrl()

  set: (field, text) ->
    @[field].sendKeys text
    @

  setType: (type) ->
    if type == 'demand'
      @types[0].click()
    else if type == 'proposal'
      @types[1].click()
    @

  validate: () ->
    @validateButton.click()
    @


describe 'New announce form', ->
  it 'should allow user creation', ->
    page = new NewAnnouncePage()
    url  = page.get()

    login = new Login()

    login
      .setName('toto')
      .setPassword('toto')
      .login()

    page
      .set('title', 'Nouvelle demande')
      .set('type', 'demand')
      .set('place', 'somewhere')
      .set('description', "J'aimerais blablabla")
      .validate()

    expect(browser.getCurrentUrl()).not.toEqual(url)