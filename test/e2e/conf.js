exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'drwowfeature_spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  // onPrepare: function() {
  //   browser.driver.get('http://localhost:8080/patient/login');
  //
  //   browser.driver.findElement(by.id('username')).sendKeys('Jane');
  //   browser.driver.findElement(by.id('password')).sendKeys('1234');
  //   browser.driver.findElement(by.id('submit')).click();
  //
  //   // Login takes some time, so wait until it's done.
  //   // For the test app's login, we know it's done when it redirects to
  //   // index.html.
  //   browser.driver.wait(function() {
  //     return browser.driver.getCurrentUrl().then(function(url) {
  //       return /index/.test(url);
  //     });
  //   });
  // },

  baseUrl: 'http://localhost:8080',
};
