Meteor.publish('projects', () => {
  return [
    Projects.find(),
    Images.find()
  ];
});

Meteor.publish('singleProject', (id) => {
  return [
    Projects.find({_id: id}),
    Images.find({parent: id})
  ];
});
