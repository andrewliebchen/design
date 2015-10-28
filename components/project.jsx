Project = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired,
    images: React.PropTypes.array
  },

  getInitialState() {
    return {
      editing: false,
      comments: false
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  handleDelete() {
    Meteor.call('deleteProject', this.props.project._id);
  },

  handleToggleComments() {
    this.setState({comments: !this.state.comments});
  },

  renderHeader() {
    let {project, images} = this.props;
    return (
      <header className="project__header">
        <h2 className="project__title">
          <a href={`/projects/${project._id}`}>{project.name}</a>
        </h2>
        <p className="project__description">{project.description}</p>
        <ul className="project__actions">
          <li onClick={this.handleEditToggle}>Edit</li>
          <li onClick={this.handleDelete}>Delete</li>
          <li onClick={this.handleToggleComments}>Comments</li>
        </ul>
      </header>
    );
  },

  render() {
    let {project, images} = this.props;
    return (
      <div className="project">
        {this.state.editing ? <ProjectForm project={project}/> : this.renderHeader()}
        <div className="project__thumbnails">
          {images.length > 0 ? images.map((image, i) => {
            return <Thumbnail key={i} image={image}/>;
          }) : <span>No images</span>}
          <ImageUploader parentId={project._id}/>
        </div>
        {this.state.comments ?
          <Panel title="Panel" onClose={this.handleToggleComments}>
            <CommentsList parentId={project._id}/>
          </Panel>
        : null}
      </div>
    );
  }
});

SingleProject = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      project: Projects.findOne(),
      images: Images.find().fetch(),
      comments: Comments.find().fetch()
    }
  },

  render() {
    return (
      <Project
        project={this.data.project}
        images={this.data.images}
        comments={this.data.comments}/>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/projects/:_id', {
    subscriptions(params) {
      this.register('singleProject', Meteor.subscribe('singleProject', params._id));
    },

    action(params) {
      FlowRouter.subsReady('singleProject', () => {
        ReactLayout.render(SingleProject);
      });
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    deleteProject(id) {
      Projects.remove(id);
    }
  });
}
