Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.sendgrid.username,
    password: Meteor.settings.sendgrid.password,
    host: Meteor.settings.sendgrid.host
  }

  process.env.MAIL_URL = 'smtp://' + smtp.username + ':' + smtp.password + '@' + smtp.host;
});

Meteor.methods({
  sendEmail(args) {
    check(args, {
      to: String,
      from: String,
      subject: String,
      text: String
    });

    this.unblock();
    Email.send(args);
  }
});
