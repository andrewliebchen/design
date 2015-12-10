const CSSTransitionGroup = React.addons.CSSTransitionGroup;

SettingsPanel = React.createClass({
  getInitialState() {
    return {
      copyLabel: false
    };
  },

  handleDeleteProject(event) {
    event.stopPropagation();

    if (window.confirm('Do you really want to delete this project?')) {
      Meteor.call('deleteProject', this.props.project._id);
    }
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
    return (
      <div className="panel__scroll">
        <div className="panel__content">
          <div className="form-group">
            <h3>Share this project</h3>
            <p>Anyone with this project's URL will be able to view the project. Share with care!</p>
            <div className="input-group">
              <input type="text" id="url" readOnly defaultValue={`${Meteor.settings.public.site_url}/${this.props.project._id}`}/>
              <button id="copyClick" data-clipboard-target="#url">Copy</button>
              <CSSTransitionGroup transitionName="copyLabel">
                {this.state.copyLabel ? <div className="copy-label">{this.state.copyLabel}</div> : null}
              </CSSTransitionGroup>
            </div>
          </div>
          <div className="form-group">
            <h3>Export project</h3>
            <p>We'd like to think that OhEmGee can do all the things, sometimes you just need to download your project. The download will include all project content, including images and comments.</p>
            <button className="full-width">Download project</button>
          </div>
          <div className="form-group">
            <h3>Danger zone!</h3>
            <p>Careful, this action can't be undone.</p>
            <button className="full-width negative" onClick={this.handleDeleteProject}>
              <Icon type="trash" size={1.5}/> Delete Project
            </button>
          </div>
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
