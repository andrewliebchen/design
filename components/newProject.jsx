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
      <div className="session">
        {currentUser && (authenticated || isAdmin) ?
          <span>
            <button onClick={this.handleNewProject}>
              Create a project
            </button>
            <a onClick={this.handleSignOut}>Sign out</a>
          </span>
        :
          <span>
            {!authenticated || !isAdmin ?
              <h2>No soup for you!</h2>
            : null}
            <button onClick={this.handleSignIn}>
              Sign in with Google
            </button>
          </span>
        }
      </div>
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
