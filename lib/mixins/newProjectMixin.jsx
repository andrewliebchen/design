NewProjectMixin = {
  handleNewProject() {
    Meteor.call('newProject', {
      created_at: Date.now(),
      created_by: Meteor.userId()
    }, (error, newProjectId) => {
      if(newProjectId) {
        FlowRouter.go(`/${newProjectId}`);
      }
    });
  }
}

if(Meteor.isServer) {
  if(Meteor.isServer) {
    Meteor.methods({
      newProject(args) {
        check(args, {
          created_at: Number,
          created_by: String
        });

        return Projects.insert({
          created_at: args.created_at,
          created_by: args.created_by
        });
      }
    });
  }
}
