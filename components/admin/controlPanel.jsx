ControlPanel = React.createClass({
  mixins: [ReactMeteorData, AccountActionsMixin],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      alphaInvites: Invites.find({type: 'alpha'}).fetch(),
      admins: Roles.getUsersInRole('admin').fetch(),
      projects: Projects.find().fetch(),
      users: Meteor.users.find().fetch()
    }
  },

  componentWillMount() {
    if(this.data.currentUser) {
      Meteor.call('addSeedAdmin', this.data.currentUser);
    }
  },

  render() {
    if (Meteor.users.find().count() === 0) {
      return (
        <div className="session">
          <button onClick={this.handleSignIn}>Setup OhEmGee</button>
        </div>
      );
    }

    if(!Roles.userIsInRole(this.data.currentUser._id, 'admin')) {
      return <Loading/>
    }

    return (
      <div className="wrapper">
        <Header
          hasPanel={false}
          title="Control panel">
          <Avatar
            user={this.data.currentUser}
            className="panel-nav__item"/>
        </Header>
        <Main>
          <InviteList
            invites={this.data.alphaInvites}
            currentUserId={this.data.currentUser._id}/>
          <ProjectList projects={this.data.projects}/>
          <AdminList
            admins={this.data.admins}
            currentUserId={this.data.currentUser._id}/>
        </Main>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/admin', {
    subscriptions() {
      this.register('admin', Meteor.subscribe('admin'));
    },

    action(params) {
      FlowRouter.subsReady('admin', () => {
        ReactLayout.render(ControlPanel);
      });
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    addSeedAdmin(currentUser) {
      check(currentUser, Object);

      if(currentUser.profile.email === Meteor.settings.adminEmail) {
        return Roles.addUsersToRoles(currentUser._id, 'admin');
      }
    }
  })
}
