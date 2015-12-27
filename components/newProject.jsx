NewProject = React.createClass({
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
    let {currentUser} = this.data;
    let authenticated = currentUser && currentUser.profile.authenticated;
    let isAdmin = currentUser ? Roles.userIsInRole(currentUser._id, ['admin']) : false;

    return (
      <Gatekeeper
        title={!authenticated || !isAdmin ? 'No soup for you!' : null}
        subtitle={!authenticated || !isAdmin ? "Sorry, but you're not authenticated." : null}>
        {currentUser && (authenticated || isAdmin) ?
          <div className="session__content">
            <button onClick={this.handleNewProject}>
              Create a project
            </button>
            <p>
              <a onClick={this.handleSignOut}>Sign out</a>
            </p>
          </div>
        :
          <div className="session__content">
            <button onClick={this.handleSignIn}>
              Sign in with Google
            </button>
          </div>
        }
      </Gatekeeper>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/create', {
    action() {
      ReactLayout.render(NewProject);
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
