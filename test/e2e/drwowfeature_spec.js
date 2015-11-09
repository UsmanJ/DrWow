describe('DrWoW login', function() {

  beforeEach(function(){
    browser.ignoreSynchronization = true;
    browser.driver.get('http://localhost:8080/login');

})
  it('has a title', function() {
    expect(browser.driver.getTitle()).toEqual('DrWow');
  });

  it('You can login', function() {
      browser.driver.findElement(by.id('username')).sendKeys('111test@test.co.uk');
      browser.driver.findElement(by.id('password')).sendKeys('123makers');
      browser.driver.findElement(by.id('submit')).click();

      expect(element(by.css('h1')).getText()).toBe('Dr WoW');
  });


});
