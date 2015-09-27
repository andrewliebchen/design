Project = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired,
    images: React.PropTypes.array
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  renderProject() {
    let {project, images} = this.props;
    return (
      <div className="project__container">
        <h2>
          <a href={`/projects/${project._id}`}>{project.name}</a>
        </h2>
        <p>{project.description}</p>
        <a onClick={this.handleEditToggle}>Edit</a>
        {images.map((image, i) => {
          return <img key={i} src={image.url}/>;
        })}
      </div>
    );
  },

  render() {
    return (
      <div className="project">
        {this.state.editing ? <ProjectForm project={this.props.project}/> : this.renderProject()}
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
        ReactLayout.render(Project, {
          project: Projects.findOne(),
          images: Images.find().fetch()
        });
      });
    }
  });
}
