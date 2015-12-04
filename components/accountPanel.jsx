AccountPanel = React.createClass({
  handleNameUpdate(event) {
    Meteor.call('updateUserName', {
      id: this.props.user._id,
      name: event.target.value
    });
  },

  handleSignOut() {
    Meteor.logOut();
  },

  handleSignIn() {
    Meteor.loginWithGoogle();
  },

  handleDeleteAccount() {
    if (window.confirm('Do you really want to delete your account?')) {
      Meteor.call('deleteUser', this.props.user._id);
    }
  },

  render() {
    return (
      <div className="panel__content">
        {this.props.user ?
          <span>
            <h3>Accounts settings</h3>
            <p>Got to put your best foot forward, right?</p>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                defaultValue={this.props.user.profile.name}
                onChange={this.handleNameUpdate}/>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                defaultValue={this.props.user.profile.email}
                disabled/>
            </div>
            <div className="form-group">
              <button className="full-width" onClick={this.handleSignOut}>Sign out</button>
            </div>
            <div className="form-group">
              <h3>Danger zone!</h3>
              <p>Careful, this action can't be undone. Once you've deleted your account, you will no longer be able to edit your projects...though they will always be available at the project URL.</p>
              <button className="full-width negative" onClick={this.handleDeleteAccount}>
                <Icon type="trash" size={1.5}/> Delete your account
              </button>
            </div>
          </span>
        :
          <span>
            <h3>Sign in to OhEmGee</h3>
            <p>Want to comment, create your own projects, and more? You'll need an account. Don't worry, setting one up is just two clicks away...</p>
            <div className="form-group">
              <button className="full-width" onClick={this.handleSignIn}>Sign in with Google</button>
            </div>
          </span>
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
