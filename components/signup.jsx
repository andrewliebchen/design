SignUp = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      invite: Invites.findOne()
    };
  },

  _checkToken() {
    let userToken = FlowRouter.getParam('token');
    let inviteToken = this.data.invite;
    if(inviteToken) {
      return userToken === inviteToken.token;
    } else {
      return false;
    }
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
      <Gatekeeper
        title={this._checkToken() ? 'Welcome to OhEmGee!' : "Whoops, your invite doesn't seem valid"}>
        <div className="session__content">
          {this._checkToken() ?
            <button className="full-width" onClick={this.handleSignIn}>
              Sign in with Google
            </button>
          : null}
        </div>
      </Gatekeeper>
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
