Meteor.publish('projects', () => {
  return [
    Projects.find(),
    Images.find()
  ];
});
