Meteor.publish('projects', (id) => {
  check(id, String);

  return Projects.find({parent: id});
});

Meteor.publish('projectChildren', (id) => {
  check(id, String);

  return [
    Images.find({parent: id}),
    Comments.find({parent: id})
  ];
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
