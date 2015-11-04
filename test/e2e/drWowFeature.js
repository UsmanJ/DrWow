describe('Dr Wow', function() {

  var textBox = element(by.model(''))
  var signupButton = element(by.className('btn'))

  it('has a title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('DrWow');
  });


});
