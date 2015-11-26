SettingsPanel = React.createClass({
  mixins: [DeleteProjectMixin],

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
