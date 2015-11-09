describe('DrWoW login', function() {

  beforeEach(function(){
  browser.get('http://localhost:8080/patient/register');

})
  it('has a title', function() {
    expect(browser.getTitle()).toEqual('DrWow');
  });

  it('You can login', function() {
    browser.driver.findElement(by.id('username')).sendKeys('test@test.com');
      browser.driver.findElement(by.id('password')).sendKeys('123makers');
      browser.driver.findElement(by.id('submit')).click();

      expect(element(by.css('.jumbotron h1')).getText()).tobe('Dr WoW');
  });


});
