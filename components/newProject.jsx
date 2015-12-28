NewProject = React.createClass({
  mixins: [ReactMeteorData, AccountActionsMixin, NewProjectMixin],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
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
