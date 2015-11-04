describe('DrWowController', function() {
  beforeEach(module('DrWow'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('DrWowController');
  }));

  it('initialises an empty sign up form', function() {
    expect(ctrl.##).toBeUndefined();
    expect(ctrl.##).toBeUndefined();
    expect(ctrl.##).toBeUndefined();
    expect(ctrl.##).toBeUndefined();
  });

  it('initialises an empty sign in form', function() {
    expect(ctrl.##).toBeUndefined();
    expect(ctrl.##).toBeUndefined();
  });
});
