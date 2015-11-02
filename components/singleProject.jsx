SingleProject = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      project: Projects.findOne(),
      images: Images.find({}, {sort: {created_at: 1}}).fetch(),
      comments: Comments.find({}, {sort: {created_at: -1}}).fetch()
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
    },

    editProject(args) {
      check(args, {
        id: String,
        name: String,
        description: String
      });

      return Projects.update(args.id, {
        $set: {
          name: args.name,
          description: args.description
        }
      });
    }
  });
}
