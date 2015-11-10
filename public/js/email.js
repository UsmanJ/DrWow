transport.sendMail({
  from: 'sender@example.com',
  to: 'catherine.stevenson14@yahoo.co.uk',
  subject: 'Hello Kitty',
  html: '<p>Hello ?</p>'
}, function(err, info) {
  if (err) {
    console.error(err);
  } else {
    console.log(info);
  }
});
