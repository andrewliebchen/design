Project = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired,
    images: React.PropTypes.array,
    showComments: React.PropTypes.bool
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  renderHeader() {
    let {project, images} = this.props;
    return (
      <header className="project__header">
        <h2 className="project__title">
          <a href={`/projects/${project._id}`}>{project.name}</a>
        </h2>
        <p className="project__description">{project.description}</p>
        <a onClick={this.handleEditToggle}>Edit</a>
      </header>
    );
  },

  render() {
    let {project, images} = this.props;
    return (
      <div className="project">
        {this.state.editing ? <ProjectForm project={project}/> : this.renderHeader()}
        <div className="project__thumbnails">
          {images.map((image, i) => {
            return (
              <a key={i}
                className="project__thumbnail"
                href={`/images/${image._id}`}>
                <img src={image.url}/>
              </a>
            );
          })}
          <div className="project__thumbnail">
            <ImageUploader parentId={project._id}/>
          </div>
        </div>
        {/*<ImageUploader parentId={project._id}/>*/}
        {this.props.showComments ?
          <CommentsList comments={this.props.comments} parentId={project._id}/>
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
        comments={this.data.comments}
        showComments/>
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
