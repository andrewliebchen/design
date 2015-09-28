Meteor.publish('projects', () => {
  return [
    Projects.find(),
    Images.find({}, {limit: 1})
  ];
});

Meteor.publish('singleProject', (id) => {
  return [
    Projects.find({_id: id}),
    Images.find({parent: id}),
    Comments.find({parent: id})
  ];
});
