SignUp = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      invite: Invites.findOne()
    };
  },

  _checkToken() {
    let userToken = FlowRouter.getParam('token');
    let inviteToken = this.data.invite.token;
    return userToken === inviteToken;
  },

  handleSignIn() {
    if(this._checkToken()) {
      Meteor.loginWithGoogle({}, (error) => {
        if(!error) {
          Meteor.call('useToken', this.data.invite._id);
          FlowRouter.go('/create');
        }
      });
    }
  },

  render() {
    return (
      <div className="session">
        {this._checkToken() ?
          <button className="full-width" onClick={this.handleSignIn}>
            Sign in with Google
          </button>
        :
          <h2>Whoops, your invite doesn't seem valid</h2>
        }
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/signup/:token', {
    subscriptions(params) {
      this.register('token', Meteor.subscribe('token', params.token));
    },

    action() {
      ReactLayout.render(SignUp);
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    useToken(token) {
      check(token, String);
      Invites.update(token, {
        $set: {account_created: Date.now()}
      });
    }
  });
}
