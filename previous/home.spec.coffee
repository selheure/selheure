describe "SEL'heure's main page", ->
  it "should have a list of 10 last posted announces", ->
    browser.get('http://cric.selheure.couch:5984/')

    #element(by.model('todoText')).sendKeys('write a protractor test')
    #element(by.css('[value="add"]')).click()

    announces = element.all(By.repeater('announce in announces |types:types |category:category:subcategory'))
    expect(announces.count()).toEqual(10)
    #expect(todoList.get(2).getText()).toEqual('write a protractor test')

