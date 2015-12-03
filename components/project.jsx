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

  handleUploaderOpen() {
    this.setState({uploader: true});
  },

  handleUploaderClose(event) {
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
        onDragEnter={this.handleUploaderOpen}
        onDragExit={this.handleUploaderClose}
        onDrop={this.handleUploaderClose}>
        <header className="header">
          <a className="header__brand" href="/">
            <Brand/>
          </a>
          <h2 className="header__title">
            <InlineEdit
              html={project.name}
              onChange={this.handleEditName}/>
          </h2>
          <PanelNav onClick={this.handlePanelOpen}/>
        </header>
        {images.length > 0 ?
          <div className="thumbnails">
            {images.map((image, i) => {
              return <Thumbnail key={i} image={image}/>;
            })}
          </div>
        :
          <div className="project__no-content">
            <h3>Let's get this show on the road...</h3>
            <button onClick={this.handleUploaderOpen}>
              Drag an image or click to upload
            </button>
          </div>
        }
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
              {this.state.panel === 'account' ?
                <AccountPanel/>
              : null}
            </div>
          </Panel>
        : null}
        <CSSTransitionGroup transitionName="uploader">
          {this.state.uploader ?
            <ImageUploader parentId={projectId} close={this.handleUploaderClose}/>
          : null}
        </CSSTransitionGroup>
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
