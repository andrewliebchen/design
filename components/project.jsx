Project = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired,
    images: React.PropTypes.array
  },

  render() {
    return (
      <div className="project">
        <h2>
          <a href={`/projects/${this.props.project._id}`}>{this.props.project.name}</a>
        </h2>
        {this.props.images.map((image, i) => {
          return <img key={i} src={image.url}/>;
        })}
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
