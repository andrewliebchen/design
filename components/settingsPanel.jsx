SettingsPanel = React.createClass({
  handleDeleteProject(event) {
    event.stopPropagation();

    if (window.confirm('Do you really want to delete this project?')) {
      Meteor.call('deleteProject', this.props.project._id);
    }
  },

  render() {
    return (
      <div className="panel__content">
        <button className="full-width negative" onClick={this.handleDeleteProject}>
          <Icon type="trash" size={1.5}/> Delete Project
        </button>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteProject(id) {
      check(id, String);
      Projects.remove(id);
    }
  });
}
