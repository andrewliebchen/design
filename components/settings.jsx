const FormMixin = {
  getInitialState() {
    return {
      disabled: true,
      alert: null
    };
  },

  handleActivateButton() {
    this.setState({disabled: false});
  },
};

const Profile = React.createClass({
  mixins: [FormMixin],

  handleSave() {
    let personName = React.findDOMNode(this.refs.personName).value;
    Meteor.call('updateProfile', {
      id: this.props.person._id,
      name: personName
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
            ref="personName"
            onChange={this.handleActivateButton}/>
        </div>
        <button
          className="full-width"
          disabled={this.state.disabled}
          onClick={this.handleSave}>
          Save
        </button>
      </span>
    );
  }
});

const Team = React.createClass({
  mixins: [FormMixin, ReactMeteorData],

  getMeteorData() {
    let teamMembers = Meteor.subscribe('teamMembers', this.props.team._id);

    return {
      loading: !teamMembers.ready(),
      teamMembers: Meteor.users.find().fetch(),
    }
  },

  handleSave() {
    let teamName = React.findDOMNode(this.refs.teamName).value;
    let teamDomain = React.findDOMNode(this.refs.teamDomain).value;
    Meteor.call('updateTeam', {
      id: this.props.team._id,
      name: teamName,
      domain: teamDomain
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
          <label>Team Name</label>
          <input
            type="text"
            placeholder="Weyland-Yutani, for example"
            defaultValue={this.props.team.name}
            ref="teamName"
            onChange={this.handleActivateButton}/>
        </div>
        <div className="form-group">
          <label>Domain</label>
          <input
            type="text"
            placeholder="weyland-yutani.com"
            defaultValue={this.props.team.domain}
            ref="teamDomain"
            onChange={this.handleActivateButton}/>
        </div>
        <div className="form-group">
          <label>Team members</label>
          {this.data.loading ?
            <span>Loading...</span>
          :
            <span>
              {this.data.teamMembers.map((teamMember, i) => {
                return <Avatar user={teamMember} key={i}/>;
              })}
            </span>
          }
        </div>
        <div className="form-group">
          <p>
            Invite new team members:<br/>
            <code>{`http://localhost:3000/signup/${this.props.team._id}`}</code>
          </p>
        </div>
        <button
          className="full-width"
          disabled={this.state.disabled}
          onClick={this.handleSave}>
          Save
        </button>
      </span>
    );
  }
});

Settings = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      person: Meteor.users.findOne(),
      team: Teams.findOne()
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
            <section className="settings__pane">
              <Team team={this.data.team}/>
            </section>
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
    },

    updateTeam(args) {
      check(args, {
        id: String,
        name: String,
        domain: String
      });

      return Teams.update(args.id, {
        $set: {
          name: args.name,
          domain: args.domain
        }
      });
    }
  });
}
