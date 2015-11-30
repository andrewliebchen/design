Meteor.publish('project', (id) => {
  check(id, String);

  return [
    Projects.find({_id: id}),
    Images.find({parent: id}),
    Comments.find({parent: id}),
    Meteor.users.find() // Probably need to only get users for this project?
  ];
});

Meteor.publish('singleImage', (id) => {
  check(id, String);

  return [
    Images.find({_id: id}),
    Comments.find({parent: id})
  ];
});
