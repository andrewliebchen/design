Home = React.createClass({
  getInitialState() {
    return {
      loading: false
    };
  },

  handleNewProject() {
    Meteor.call('newProject', Date.now(), (error, success) => {
      if(success) {
        FlowRouter.go(`/${success}`);
      }
    });
  },

  render() {
    return (
      <div className="wrapper">
        {this.state.loading ?
          <Loading/>
        :
          <span>
            Get started...
            <button onClick={this.handleNewProject}>Create a project</button>
          </span>
        }
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/', {
    action() {
      ReactLayout.render(Home);
    }
  });
}

if(Meteor.isServer) {
  if(Meteor.isServer) {
    Meteor.methods({
      newProject(createdAt) {
        check(createdAt, Number);

        return Projects.insert({
          created_at: createdAt
        });
      }
    });
  }
}
