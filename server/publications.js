Meteor.publish('project', (id) => {
  check(id, String);

  return [
    Projects.find({_id: id}),
    Images.find({parent: id}),
    Comments.find({parent: id})
  ];
});

Meteor.publish('image', (id) => {
  check(id, String);

  return [
    Images.find({_id: id}),
    Comments.find({parent: id}),
    Projects.find({_id: Images.findOne(id).parent})
  ];
});

Meteor.publish('user', (id) => {
  check(id, String);
  return Meteor.users.find({_id: id});
})
