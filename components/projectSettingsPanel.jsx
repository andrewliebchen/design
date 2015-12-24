const CSSTransitionGroup = React.addons.CSSTransitionGroup;

ProjectSettingsPanel = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired,
    canEdit: React.PropTypes.bool,
    currentUser: React.PropTypes.object
  },

  getInitialState() {
    return {
      copyLabel: false
    };
  },

  handleDeleteProject() {
    if (window.confirm('Do you really want to delete this project?')) {
      Meteor.call('deleteProject', this.props.project._id);
    }
  },

  handleSendInvite() {
    Meteor.call('sendEmail', {
      to: React.findDOMNode(this.refs.invite).value,
      from: 'Andrew from OhEmGee <andrew@ohemgee.space>',
      subject: `Join ${this.props.currentUser.profile.name}'s project on OhEmGee`,
      text: `Check out ${this.props.project.name} on OhEmGee at ${Meteor.settings.public.site_url}/${this.props.project._id}.`
    });
  },

  componentDidMount() {
    let clipboard = new Clipboard('#copyClick');

    clipboard.on('success', (event) => {
      this.setState({copyLabel: 'Copied to your clipboard!'});
      setTimeout(() => {this.setState({copyLabel: false})}, 2500);
      event.clearSelection();
    });
  },

  render() {
    let {project, canEdit} = this.props;
    return (
      <div className="panel__scroll">
        <div className="panel__content">
          <div className="form-group">
            <h3>Share this project</h3>
            <p>Anyone with this project's URL will be able to view the project. Share with care!</p>
            <div className="input-group">
              <input type="text" id="url" readOnly defaultValue={`${Meteor.settings.public.site_url}/${project._id}`}/>
              <button id="copyClick" data-clipboard-target="#url">Copy</button>
              <CSSTransitionGroup transitionName="copyLabel">
                {this.state.copyLabel ? <div className="copy-label">{this.state.copyLabel}</div> : null}
              </CSSTransitionGroup>
            </div>
          </div>
          <div className="form-group">
            <h3>Invite your team</h3>
            <p>OhEmGee is made for your team. Add your team's email, and we can send them the link to this project.</p>
            <textarea ref="invite" placeholder="Separate each address with a comma"/>
            <button className="full-width" onClick={this.handleSendInvite}>
              Send email
            </button>
          </div>
          {canEdit ?
            <div className="form-group">
              <h3>Export project</h3>
              <p>We'd like to think that OhEmGee can do all the things, sometimes you just need to download your project. The download will include all project content, including images and comments.</p>
              <button className="full-width">Download project</button>
            </div>
          : null}
          {canEdit ?
            <div className="form-group">
              <h3>Danger zone!</h3>
              <p>Careful, this action can't be undone.</p>
              <button className="full-width negative" onClick={this.handleDeleteProject}>
                <Icon type="trash" size={1.5}/> Delete Project
              </button>
            </div>
          : null}
        </div>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteProject(id) {
      check(id, String);
      Projects.remove(id);
    }
  });
}
