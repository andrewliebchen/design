Settings = React.createClass({
  getInitialState() {
    return {
      person: Meteor.user()
    };
  },

  render() {
    let {person} = this.state;
    return (
      <div className="settings">
        <header className="header project__header">
          <Session/>
          <h2 className="header__title">Settings</h2>
        </header>
        <div className="settings__content">
          <div className="form-group">
            <label>Name</label>
            <input type="text" defaultValue={person.profile.name} ref="name"/>
          </div>
          <button>Save</button>
        </div>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/settings', {
    action() {
      ReactLayout.render(Layout, {
        content: <Settings/>
      });
    }
  });
}
