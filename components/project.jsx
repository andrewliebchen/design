Project = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      editing: false,
      uploader: false
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  handleDelete() {
    Meteor.call('deleteProject', this.props.project._id);
  },

  handleSaveProject() {
    let projectName = React.findDOMNode(this.refs.name).value;
    let projectDescription = React.findDOMNode(this.refs.description).value;

    Meteor.call('editProject', {
      id: this.props.project._id,
      name: projectName,
      description: projectDescription
    }, (error, success) => {
      if(success) {
        this.setState({editing: false});
      }
    });
  },

  handleDragStart() {
    this.setState({uploader: true});
  },

  handleDragEnd() {
    this.setState({uploader: false});
  },

  renderEditing() {
    let {project} = this.props;
    return (
      <div>
        <label>Name</label>
        <input type="text" defaultValue={project.name} ref="name"/>
        <label>Description</label>
        <textarea defaultValue={project.description} ref="description"/>
        <button onClick={this.handleSaveProject}>Save</button>
      </div>
    );
  },

  renderHeader() {
    let {project} = this.props;
    let createdBy = Meteor.users.findOne(project.created_by);
    return (
      <header className="project__header">
        <h2 className="project__title">
          <a href={`/projects/${project._id}`}>{project.name}</a>
        </h2>
        <div className="project__body">
          <div className="project__description">
            {project.description}
          </div>
          <aside className="project__aside">
            {createdBy ? <Avatar user={createdBy}/> : null}
            <ul className="project__actions">
              <li onClick={this.handleEditToggle}>Edit</li>
              <li onClick={this.handleDelete}>Delete</li>
            </ul>
          </aside>
        </div>
      </header>
    );
  },

  render() {
    let {project} = this.props;
    return (
      <div
        className="project"
        onDragEnter={this.handleDragStart}
        onDragExit={this.handleDragEnd}
        onDrop={this.handleDragEnd}>
        {this.state.editing ? this.renderEditing() : this.renderHeader()}
        <ProjectChildren parentId={project._id}/>
        {this.state.uploader ? <ImageUploader parentId={parentId}/> : null}
      </div>
    );
  }
});
