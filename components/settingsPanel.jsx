SettingsPanel = React.createClass({
  handleDeleteProject() {
    if (window.confirm('Do you really want to delete this project?')) {
      Meteor.call('deleteProject', this.props.project._id);
    }
  },

  render() {
    return (
      <div className="panel__content">
        <button className="full-width negative" onClick={this.handleDeleteProject}>
          Delete Project
        </button>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteProject(id) {
      Projects.remove(id);
    }
  });
}
