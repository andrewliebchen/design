Home = React.createClass({
  mixins: [ReactMeteorData, AccountActionsMixin],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  handleNewProject() {
    Meteor.call('newProject', {
      created_at: Date.now(),
      created_by: this.data.currentUser._id
    }, (error, newProjectId) => {
      if(newProjectId) {
        FlowRouter.go(`/${newProjectId}`);
      }
    });
  },

  render() {
    return (
      <div className="wrapper">
        <div className="get-started">
          <header className="get-started__header">
            <Brand size={13}/>
          </header>
          {this.data.currentUser ?
            <div className="get-started__content">
              <button className="full-width" onClick={this.handleNewProject}>
                Create a project
              </button>
              <a onClick={this.handleSignOut}>Sign out</a>
            </div>
          :
            <div className="get-started__content">
              <button className="full-width" onClick={this.handleSignIn}>
                Sign in with Google
              </button>
            </div>
          }
        </div>
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
      newProject(args) {
        check(args, {
          created_at: Number,
          created_by: String
        });

        return Projects.insert({
          created_at: args.created_at,
          created_by: args.created_by
        });
      }
    });
  }
}
