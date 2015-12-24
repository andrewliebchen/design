ControlPanel = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      alphaInvites: Invites.find({type: 'alpha'}).fetch(),
      admins: Roles.getUsersInRole('admin').fetch(),
      projects: Projects.find().fetch(),
      users: Meteor.users.find().fetch()
    }
  },

  render() {
    if(!Roles.userIsInRole(this.data.currentUser._id,'admin')) {
      return <Loading/>
    }

    return (
      <div className="wrapper">
        <Header
          hasPanel={false}
          title="Control panel">
          <Avatar
            user={this.data.currentUser}
            className="panel-nav__item"
            label="Account"/>
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
