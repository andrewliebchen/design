Meteor.publish('projects', (id) => {
  check(id, String);

  return Projects.find({parent: id});
});

Meteor.publish('thumbnails', (id) => {
  check(id, String);

  return Images.find({parent: id});
});

Meteor.publish('singleProject', (id) => {
  check(id, String);

  return [
    Projects.find({_id: id}),
    Images.find({parent: id}),
    Comments.find({parent: id})
  ];
});

Meteor.publish('singleImage', (id) => {
  check(id, String);

  return [
    Images.find({_id: id}),
    Comments.find({parent: id})
  ];
});

Meteor.publish('settings', (id) => {
  check(id, String);

  return [
    Meteor.users.find({_id: id}),
    Teams.find({_id: Meteor.users.findOne(id).profile.team})
  ];
});

Meteor.publish('teamMembers', (id) => {
  check(id, String);

  return Meteor.users.find({'profile.team': id});
});
