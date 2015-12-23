Admin = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      alphaInvites: Invites.find({type: 'alpha'}).fetch()
    }
  },

  handleInvite() {
    Meteor.call('addInvite', {
      type: 'alpha',
      created_by: this.data.currentUser._id,
      created_at: Date.now(),
      email: React.findDOMNode(this.refs.email).value
    }, (error, success) => {
      if(success) {
        React.findDOMNode(this.refs.email).value = '';
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
            <h3>Admins</h3>
          </div>
          <div className="card">
            <h3>Alpha invites</h3>
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
                        <a>Revoke</a>
                        <a>Resend</a>
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
                <button onClick={this.handleInvite}>Add Invite</button>
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

      return Invites.insert({
        type: args.type,
        created_by: args.created_by,
        created_at: args.created_at,
        email: args.email,
        token: Random.hexString(15),
        account_created: false
      });
    }
  });
}
