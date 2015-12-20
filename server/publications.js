Meteor.publish(null, () => {
  return Meteor.roles.find({})
});

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
  let parentId = Images.findOne(id).parent;

  return [
    Images.find({parent: parentId}), // Wish this could be limited to current image + next/prev
    Comments.find({parent: id}),
    Projects.find({_id: parentId})
  ];
});

Meteor.publish('user', (id) => {
  check(id, String);
  return Meteor.users.find({_id: id});
})
