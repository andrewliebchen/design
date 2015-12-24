AdminList = React.createClass({
  propTypes: {
    admins: React.PropTypes.array,
    currentUserId: React.PropTypes.string
  },

  handleDemoteAdmin(id) {
    Meteor.call('demoteAdmin', id, (error, success) => {
      if(success) {
        Session.set('toast', 'DEEE-moted!');
      }
    });
  },

  handleAddAsAdmin() {
    let email = React.findDOMNode(this.refs.adminEmail);
    Meteor.call('addAsAdmin', email.value, (error, success) => {
      if(error) {
        Session.set('toast', `Sorry, ${email.value} doesn't match an existing user`);
      }
      if(success) {
        Session.set('toast', `Welcome to the club ${email.value}`);
        email.value = '';
      }
    })
  },

  render() {
    return (
      <div className="card">
        <h3 className="card__title">Admins</h3>
        <table>
          <thead>
            <th>User</th>
            <th/>
          </thead>
          <tbody>
            {this.props.admins.map((admin, i) => {
              return (
                <tr key={i}>
                  <td><Avatar user={admin} size="tiny"/> {admin.profile.name}</td>
                  <td>
                    {admin._id !== this.props.currentUserId ?
                      <button
                        className="small negative"
                        onClick={this.handleDemoteAdmin.bind(null, admin._id)}>
                        Demote
                      </button>
                    : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="form-group">
          <label>New admin's email</label>
          <div className="input-group">
            <input type="email" ref="adminEmail"/>
            <button onClick={this.handleAddAsAdmin}>Add as admin</button>
          </div>
        </div>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    demoteAdmin(id) {
      check(id, String);
      return Roles.removeUsersFromRoles(id, 'admin');
    },

    addAsAdmin(email) {
      check(email, String);
      let user = Meteor.users.findOne({'profile.email': email});
      if(user) {
        return Roles.addUsersToRoles(user._id, 'admin');
      } else {
        throw new Meteor.error('not-a-user', 'No such user!');
      }
    }
  });
}
