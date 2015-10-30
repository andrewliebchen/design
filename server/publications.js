Meteor.publish('projects', () => {
  return [
    Projects.find(),
    Images.find(),
    Comments.find()
  ];
});

Meteor.publish('singleProject', (id) => {
  return [
    Projects.find({_id: id}),
    Images.find({parent: id}),
    Comments.find({parent: id})
  ];
});

Meteor.publish('singleImage', (id) => {
  return [
    Images.find({_id: id}),
    Comments.find({parent: id})
  ];
});
