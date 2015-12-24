InviteList = React.createClass({
  propTypes: {
    invites: React.PropTypes.array,
    currentUserId: React.PropTypes.string
  },

  handleCreateToken() {
    let email = React.findDOMNode(this.refs.inviteEmail);
    let emailExists = Invites.findOne({email: email.value});
    if(!emailExists) {
      Meteor.call('addInvite', {
        type: 'alpha',
        created_by: this.props.currentUserId,
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
    let {invites} = this.props;
    return (
      <div className="card">
        <h3 className="card__title">Alpha invites</h3>
        {invites.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Type</th>
                <th>Token</th>
                <th>Accepted</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {invites.map((invite, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a href={`mailto:${invite.email}`}>{invite.email}</a>
                    </td>
                    <td>{invite.type}</td>
                    <td>{invite.token}</td>
                    <td>{invite.account_created ? `✅${invite.account_created}` : '⏳'}</td>
                    <td>
                      <button
                        className="small negative"
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
        : <strong>No invites</strong>}
        <div className="form-group">
          <label>Recipient email</label>
          <div className="input-group">
            <input type="email" ref="inviteEmail"/>
            <button onClick={this.handleCreateToken}>Create token</button>
          </div>
        </div>
      </div>
    );
  }
});

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
