Admin = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      alphaInvites: Invites.find({type: 'alpha'}).fetch()
    }
  },

  handleCreateToken() {
    let email = React.findDOMNode(this.refs.email);
    let emailExists = Invites.findOne({email: email.value});
    if(!emailExists) {
      Meteor.call('addInvite', {
        type: 'alpha',
        created_by: this.data.currentUser._id,
        created_at: Date.now(),
        email: email.value
      }, (error, success) => {
        if(success) {
          email.value = '';
        }
      });
    } else {
      Session.set('toast', "Whoops, that person's already been invited!");
    }
  },

  handleSendInvite(email, token) {
    Meteor.call('sendEmail', {
      to: email,
      from: 'Andrew from OhEmGee <andrew@ohemgee.space>',
      subject: "Here's your invite to OhEmGee",
      message: token
    });
  },

  handleRevoke(id) {
    Meteor.call('revokeToken', id, (error, success) => {
      if(success) {
        Session.set('toast', 'Token revoked!')
      }
    });
  },

  render() {
    // if(!Roles.userIsInRole(this.data.currentUser._id,'admin')) {
    //   return <Loading/>
    // }

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
          <div className="card">
            <h3 className="card__title">Alpha invites</h3>
            <table>
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Type</th>
                  <th>Token</th>
                  <th>Created</th>
                  <th>Accepted</th>
                  <th/>
                </tr>
              </thead>
              <tbody>
                {this.data.alphaInvites.map((invite, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <a href={`mailto:${invite.email}`}>{invite.email}</a>
                      </td>
                      <td>{invite.type}</td>
                      <td>{invite.token}</td>
                      <td>{invite.created_at}</td>
                      <td>{invite.account_created ? `✅${invite.account_created}` : '⏳'}</td>
                      <td>
                        <button
                          className="small"
                          onClick={this.handleRevoke.bind(null, invite._id)}>
                          Revoke
                        </button>
                        <button
                          className="small"
                          onClick={this.handleSendInvite.bind(null, invite.email, invite.token)}>
                          Resend
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="form-group">
              <label>Recipient email</label>
              <div className="input-group">
                <input type="email" ref="email"/>
                <button onClick={this.handleCreateToken}>Create token</button>
              </div>
            </div>
          </div>
        </Main>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/admin', {
    subscriptions() {
      this.register('admin', Meteor.subscribe('admin', Meteor.userId()));
    },

    action(params) {
      FlowRouter.subsReady('admin', () => {
        ReactLayout.render(Admin);
      });
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    addInvite(args) {
      check(args, {
        type: String,
        created_by: String,
        created_at: Number,
        email: String
      });

      let token = Random.hexString(15);

      return Invites.insert({
        type: args.type,
        created_by: args.created_by,
        created_at: args.created_at,
        email: args.email,
        token: token,
        account_created: false
      }, (error, success) => {
        if(success) {
          Meteor.call('sendEmail', {
            to: args.email,
            from: 'Andrew from OhEmGee <andrew@ohemgee.space>',
            subject: "Here's your invite to OhEmGee",
            text: `${Meteor.settings.public.site_url}/invites/${token}`
          });
        }
      });
    },

    revokeToken(id) {
      check(id, String);
      return Invites.remove(id);
    }
  });
}
