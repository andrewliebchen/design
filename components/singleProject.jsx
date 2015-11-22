SingleProject = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      project: Projects.findOne(),
      images: Images.find({}, {sort: {created_at: 1}}).fetch(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch()
    }
  },

  getInitialState() {
    return {
      uploader: false,
      panel: false
    };
  },

  handleDelete() {
    Meteor.call('deleteProject', this.props.project._id);
  },

  handlePanelOpen(panelName) {
    this.setState({panel: panelName});
  },

  handlePanelClose() {
    this.setState({panel: null});
  },

  handleDragStart() {
    this.setState({uploader: true});
  },

  handleDragEnd() {
    this.setState({uploader: false});
  },

  render() {
    let {project, comments} = this.data;
    let projectId = project._id;
    return (
      <div
        className="project"
        onDragEnter={this.handleDragStart}
        onDragExit={this.handleDragEnd}
        onDrop={this.handleDragEnd}>
        <header className="header project__header">
          <a className="block brand" href="/">💅</a>
          <h2 className="header__title">{project.name}</h2>
          <PanelNav onClick={this.handlePanelOpen}/>
          <a className="add-project block brand">+</a>
        </header>
        <Thumbnails parentId={projectId}/>
        {this.state.uploader ? <ImageUploader parentId={projectId}/> : null}
        {this.state.panel ?
          <Panel
            open={this.handlePanelOpen}
            close={this.handlePanelClose}
            selected={this.state.panel}>
            <div className="panel__content">
              {this.state.panel === 'comments' ?
                <span>
                  <div className="project__description">
                    {project.description}
                  </div>
                  <CommentsList comments={comments} parentId={projectId}/>
                </span>
              : null}
              {this.state.panel === 'settings' ? 'Settings' : null}
            </div>
          </Panel>
        : null}
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/projects/:_id', {
    subscriptions(params) {
      this.register('singleProject', Meteor.subscribe('singleProject', params._id));
    },

    action(params) {
      FlowRouter.subsReady('singleProject', () => {
        ReactLayout.render(SingleProject);
      });
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    deleteProject(id) {
      Projects.remove(id);
    },

    editProject(args) {
      check(args, {
        id: String,
        name: String,
        description: String
      });

      return Projects.update(args.id, {
        $set: {
          name: args.name,
          description: args.description
        }
      });
    }
  });
}
