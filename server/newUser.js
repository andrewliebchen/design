Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});

Meteor.methods({
  'newUser': function(user) {
    let newUserId = Accounts.createUser({
      username: user.username,
      email: user.email,
      password: user.password,
      profile: {
        organization: user.organization,
        name: user.name,
        imageSrc: user.imageSrc,
      }
    });

    Accounts.sendVerificationEmail(newUserId);
    return newUserId;
  },
});
