Meteor.publish('projects', () => {
  return [
    Projects.find(),
    Images.find()
  ];
});

Meteor.publish('comments', (id) => {
  return Comments.find({parent: id});
});

Meteor.publish('singleProject', (id) => {
  return [
    Projects.find({_id: id}),
    Images.find({parent: id})
  ];
});

Meteor.publish('singleImage', (id) => {
  return [
    Images.find({_id: id})
  ];
});
