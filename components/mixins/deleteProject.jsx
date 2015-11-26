DeleteProjectMixin = {
  handleDeleteProject(event) {
    event.stopPropagation();

    if (window.confirm('Do you really want to delete this project?')) {
      Meteor.call('deleteProject', this.props.project._id);
    }
  }
}

if(Meteor.isServer) {
  Meteor.methods({
    deleteProject(id) {
      check(id, String);
      Projects.remove(id);
    }
  });
}
