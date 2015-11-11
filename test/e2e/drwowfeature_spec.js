describe('DrWoW login', function() {

  beforeEach(function(){
    browser.ignoreSynchronization = true;
    browser.driver.get('http://localhost:8080/login');

})

afterEach(function(){
  var removedata = function(db, callback) {
     db.collection('accounts').deleteMany( {}, function(err, results) {
        console.log(results);
        callback();
     });
  };
})
  // it('has a title', function() {
  //   expect(browser.driver.getTitle()).toEqual('DrWow');
  // });
  //
  // it('can register you as a patient', function(){
  //     browser.driver.get('http://localhost:8080/register');
  //     browser.driver.findElement(by.id('username')).sendKeys('119test@test.co.uk');
  //     browser.driver.findElement(by.id('password')).sendKeys('123makers');
  //     browser.driver.findElement(by.id('role')).sendKeys('patient');
  //     browser.driver.findElement(by.id('submit')).click();
  //     expect(element(by.css('h1')).getText()).toBe('You are currently logged in as 119test@test.co.uk - patient');
  //
  // });
  //
  // it('can register you as a doctor', function(){
  //     browser.driver.get('http://localhost:8080/register');
  //     browser.driver.findElement(by.id('username')).sendKeys('drtest@test.co.uk');
  //     browser.driver.findElement(by.id('password')).sendKeys('123makers');
  //     browser.driver.findElement(by.id('role')).sendKeys('doctor');
  //     browser.driver.findElement(by.id('submit')).click();
  //     expect(element(by.css('h1')).getText()).toBe('You are currently logged in as drtest@test.co.uk - doctor');
  //
  // });
  //
  // it('You can login as a patient', function() {
  //     browser.driver.get('http://localhost:8080/login');
  //     browser.driver.findElement(by.id('username')).sendKeys('111test@test.co.uk');
  //     browser.driver.findElement(by.id('password')).sendKeys('123makers');
  //     browser.driver.findElement(by.id('submit')).click();
  //     expect(element(by.css('h1')).getText()).toBe('You are currently logged in as 111test@test.co.uk - patient');
  // });
  //
  // it('You can login as a doctor', function() {
  //     browser.driver.get('http://localhost:8080/login');
  //     browser.driver.findElement(by.id('username')).sendKeys('dr@test.co.uk');
  //     browser.driver.findElement(by.id('password')).sendKeys('123makers');
  //     browser.driver.findElement(by.id('submit')).click();
  //     expect(element(by.css('h1')).getText()).toBe('You are currently logged in as dr@test.co.uk - doctor');
  // });
  //
  // it('allows you to access a doctor', function() {
  //     browser.driver.get('http://localhost:8080/login');
  //     browser.driver.findElement(by.id('username')).sendKeys('111test@test.co.uk');
  //     browser.driver.findElement(by.id('password')).sendKeys('123makers');
  //     browser.driver.findElement(by.id('submit')).click();
  //     browser.driver.findElement(by.id('start consultation - DrTest')).click();
  //     expect(element(by.css('h1')).getText()).toBe("You are now in Dr Test's surgury");
  // });
  //
  // it('allows you to see the doctor on a screen', function() {
  //     browser.driver.get('http://localhost:8080/login');
  //     browser.driver.findElement(by.id('username')).sendKeys('111test@test.co.uk');
  //     browser.driver.findElement(by.id('password')).sendKeys('123makers');
  //     browser.driver.findElement(by.id('submit')).click();
  //     browser.driver.findElement(by.id('start consultation - DrTest')).click();
  //     expect(element(by.css('video')).getText()).toBe("however we are going to test for a video");
  // });
  //
  // it('allows the doctor to access a form', function() {
  //     browser.driver.get('http://localhost:8080/login');
  //     browser.driver.findElement(by.id('username')).sendKeys('111test@test.co.uk');
  //     browser.driver.findElement(by.id('password')).sendKeys('123makers');
  //     browser.driver.findElement(by.id('submit')).click();
  //     browser.driver.findElement(by.id('start consultation - DrTest')).click();
  //     expect(element(by.css('video')).getText()).toBe("however we are going to test for a video");
  // });

  it('allows me to send an email', function() {
      browser.driver.get('http://localhost:8080/login');
      browser.driver.findElement(by.id('username')).sendKeys('111test@test.co.uk');
      browser.driver.findElement(by.id('password')).sendKeys('123makers');
      browser.driver.findElement(by.id('submit')).click();
      browser.get('/emailform')
      browser.driver.findElement(by.id('emailme')).sendKeys('111test@test.co.uk');
      browser.driver.findElement(by.id('clickhere')).click();
      expect(element(by.css('h1')).getText()).toBe("Your email has been sent");
  });









});
