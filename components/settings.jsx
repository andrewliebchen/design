const Profile = React.createClass({
  getInitialState() {
    return {
      disabled: true,
      alert: null
    };
  },

  handleProfileChange() {
    this.setState({disabled: false});
  },

  handleSave() {
    let name = React.findDOMNode(this.refs.name).value;
    Meteor.call('updateProfile', {
      id: this.props.person._id,
      name: name
    }, (err, success) => {
      if(success){
        this.setState({alert: 'Changes Saved!'});
      }
    });
  },

  render() {
    return (
      <span>
        {this.state.alert ? <div className="alert">{this.state.alert}</div> : null}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            defaultValue={this.props.person.profile.name}
            ref="name"
            onChange={this.handleProfileChange}/>
        </div>
        <button disabled={this.state.disabled} onClick={this.handleSave}>Save</button>
      </span>
    );
  }
})

Settings = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      person: Meteor.users.findOne()
    };
  },

  render() {
    return (
      <div className="settings">
        <header className="header project__header">
          <Session/>
          <h2 className="header__title">Settings</h2>
        </header>
        <div className="settings__content">
          <Tabs
            defaultTabNum={0}
            tabNames={['Profile','Team','Billing']}>
            <section className="settings__pane">
              <Profile person={this.data.person}/>
            </section>
            <section className="settings__pane">Team</section>
            <section className="settings__pane">Billing</section>
          </Tabs>
        </div>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/settings', {
    subscriptions(params) {
      this.register('settings', Meteor.subscribe('settings', Meteor.userId()));
    },

    action(params) {
      FlowRouter.subsReady('settings', () => {
        ReactLayout.render(Layout, {
          content: <Settings/>
        });
      });
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    updateProfile(args) {
      check(args, {
        id: String,
        name: String
      });

      return Meteor.users.update(args.id, {
        $set: {
          'profile.name': args.name
        }
      });
    }
  });
}
