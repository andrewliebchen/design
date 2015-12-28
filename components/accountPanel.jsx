AccountPanel = React.createClass({
  mixins: [ReactMeteorData, AccountActionsMixin, NewProjectMixin],

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getMeteorData() {
    let currentUserId = Meteor.user()._id;
    let projects = Meteor.subscribe('userProjects', currentUserId);

    return {
      loading: !projects.ready(),
      projects: Projects.find(
        {created_by: currentUserId},
        {sort: {created_at: 1}}
      ).fetch(),
      currentProject: Projects.findOne(FlowRouter.getParam('_id'))
    };
  },

  handleNameUpdate(event) {
    Meteor.call('updateUserName', {
      id: this.props.currentUser._id,
      name: event.target.value
    }, (error, success) => {
      if(success){
        Session.set('toast', 'Your name has been updated');
      }
    });
  },

  handleDeleteAccount() {
    if (window.confirm('Do you really want to delete your account?')) {
      Meteor.call('deleteUser', this.props.currentUser._id);
    }
  },

  render() {
    let {currentUser} = this.props;
    let {loading, projects, currentProject} = this.data;
    return (
      <div className="panel__scroll">
        {currentUser && Roles.userIsInRole(currentUser._id, ['admin']) ?
          <div className="panel__banner">Sweet! You're an admin. <a href="/admin">Manage</a></div>
        : null}
        {currentUser ?
          <div className="panel__content">
            <h3>Accounts settings</h3>
            <p>Got to put your best foot forward, right?</p>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                defaultValue={currentUser.profile.name}
                onChange={this.handleNameUpdate}/>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                defaultValue={currentUser.profile.email}
                disabled/>
            </div>
            <div className="form-group">
              <button className="full-width" onClick={this.handleSignOut}>Sign out</button>
            </div>
            <div className="form-group">
              <h3>Projects</h3>
              {projects.length > 0 ?
                <span>
                <table>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {currentProject._id === project._id ? '👉' : null}
                            <strong>
                              <a href={`/${project._id}`}>
                                {project.name ? project.name : 'Untitled'}
                              </a>
                            </strong>
                          </td>
                          <td>{moment(project.created_at).fromNow()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button onClick={this.handleNewProject} className="full-width">Create new project</button>
                </span>
              : <p>No projects. <a onClick={this.handleNewProject}>Create one?</a></p>}
            </div>
            <div className="form-group">
              <h3>Danger zone!</h3>
              <p>Careful, this action can't be undone. Once you've deleted your account, you will no longer be able to edit your projects...though they will always be available at the project URL.</p>
              <button className="full-width negative" onClick={this.handleDeleteAccount}>
                <Icon type="trash" size={1.5}/> Delete your account
              </button>
            </div>
          </div>
        :
          <div className="panel__content">
            <h3>Sign in to OhEmGee</h3>
            <p>Want to comment, create your own projects, and more? You'll need an account. Don't worry, setting one up is just two clicks away...</p>
            <div className="form-group">
              <button className="full-width" onClick={this.handleSignIn}>Sign in with Google</button>
            </div>
          </div>
        }
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    updateUserName(args) {
      check(args, {
        id: String,
        name: String
      });

      return Meteor.users.update(args.id, {
        $set: {
          'profile.name': args.name
        }
      });
    },

    deleteUser(id) {
      check(id, String);
      return Meteor.users.remove({_id: id});
    }
  });
}
