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

  render() {
    let {project, images} = this.props;
    return (
      <span>
        {this.state.editing ?
          <ProjectForm project={this.props.project}/>
        : <div className="project__content">
            <h2>
              <a href={`/projects/${project._id}`}>{project.name}</a>
            </h2>
            <p>{project.description}</p>
            <a onClick={this.handleEditToggle}>Edit</a>
            {images.map((image, i) => {
              return <img key={i} src={image.url}/>;
            })}
            <ImageUploader projectId={project._id}/>
            {this.props.showComments ?
              <CommentsList comments={this.props.comments} projectId={project._id}/>
            : null}
          </div>}
      </span>
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
      <div className="project">
        <Project
          project={this.data.project}
          images={this.data.images}
          comments={this.data.comments}
          showComments/>
      </div>
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
