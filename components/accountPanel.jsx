AccountPanel = React.createClass({
  render() {
    return (
      <div className="panel__content">
        {this.props.user ?
          <span>
            <h3>Accounts settings</h3>
            <div className="form-group">
              <label>Name</label>
              <input type="text" defaultValue={this.props.user.profile.name}/>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" defaultValue={this.props.user.profile.email} disabled/>
            </div>
            <div className="form-group">
              <button className="full-width">Sign out</button>
            </div>
            <div className="form-group">
              <h3>Danger zone!</h3>
              <p>Careful, this action can't be undone.</p>
              <button className="full-width negative">
                <Icon type="trash" size={1.5}/> Delete your account
              </button>
            </div>
          </span>
        : <AccountsUIWrapper/>}
      </div>
    );
  }
});
