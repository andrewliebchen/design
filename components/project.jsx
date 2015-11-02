Project = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired,
    images: React.PropTypes.array,
    comment: React.PropTypes.array
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  handleDelete() {
    console.log(this.props.project._id);
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
        <p className="project__description">{project.description}</p>
        {createdBy ? <Avatar user={createdBy}/> : null}
        <ul className="project__actions">
          <li onClick={this.handleEditToggle}>Edit</li>
          <li onClick={this.handleDelete}>Delete</li>
        </ul>
      </header>
    );
  },

  render() {
    let {project, images, comments} = this.props;
    return (
      <div className="project">
        {this.state.editing ? this.renderEditing() : this.renderHeader()}
        <ImageUploader parentId={project._id}/>
        <div className="project__thumbnails">
          {images.length > 0 ? images.map((image, i) => {
            return <Thumbnail key={i} image={image}/>;
          }) : <span>No images</span>}
        </div>
        <CommentsList comments={comments} parentId={project._id}/>
      </div>
    );
  }
});
