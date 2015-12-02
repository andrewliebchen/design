const CSSTransitionGroup = React.addons.CSSTransitionGroup;

Project = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      project: Projects.findOne(),
      images: Images.find({}, {sort: {created_at: 1}}).fetch(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch()
    }
  },

  getInitialState() {
    let urlParams = FlowRouter.getQueryParam('show');
    return {
      uploader: false,
      panel: urlParams ? urlParams : false
    };
  },

  handlePanelOpen(panelName) {
    this.setState({panel: panelName});
    FlowRouter.setQueryParams({show: panelName});
  },

  handlePanelClose() {
    this.setState({panel: null});
    FlowRouter.setQueryParams({show: null});
  },

  handleDragStart() {
    this.setState({uploader: true});
  },

  handleDragEnd(event) {
    event.stopPropagation();
    this.setState({uploader: false});
  },

  handleEditName(event) {
    Meteor.call('editProjectName', {
      id: this.data.project._id,
      name: event.target.value
    });
  },

  render() {
    let {project, comments, images} = this.data;
    let projectId = project._id;
    return (
      <div
        className="project wrapper"
        onDragEnter={this.handleDragStart}
        onDragExit={this.handleDragEnd}
        onDrop={this.handleDragEnd}>
        <header className="header">
          <a className="header__brand" href="/">
            <Brand/>
          </a>
          <h2 className="header__title">
            <InlineEdit html={project.name} onChange={this.handleEditName}/>
          </h2>
          <PanelNav onClick={this.handlePanelOpen}/>
          <Avatar user={Meteor.user()} size="large" imageOnly/>
        </header>
        <div className="thumbnails">
          {images.length > 0 ? images.map((image, i) => {
            return <Thumbnail key={i} image={image}/>;
          }) : <span>No images</span>}
        </div>
        {this.state.uploader ? <ImageUploader parentId={projectId} close={this.handleDragEnd}/> : null}
        {this.state.panel ?
          <Panel
            open={this.handlePanelOpen}
            close={this.handlePanelClose}
            selected={this.state.panel}>
            <div>
              {this.state.panel === 'comments' ?
                <CommentsPanel
                  description={project.description}
                  comments={comments}
                  parentId={projectId}/>
              : null}
              {this.state.panel === 'settings' ?
                <SettingsPanel project={project}/>
              : null}
            </div>
          </Panel>
        : null}
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/:_id', {
    subscriptions(params) {
      this.register('project', Meteor.subscribe('project', params._id));
    },

    action(params) {
      FlowRouter.subsReady('project', () => {
        ReactLayout.render(Project);
      });
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    editProjectName(args) {
      check(args, {
        id: String,
        name: String
      });

      return Projects.update(args.id, {
        $set: {
          name: args.name
        }
      });
    }
  });
}
