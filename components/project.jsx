const CSSTransitionGroup = React.addons.CSSTransitionGroup;

const panelNavTypes = ['comments', 'settings'];

Project = React.createClass({
  mixins: [ReactMeteorData, PanelMixin, CanEditMixin],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      project: Projects.findOne(),
      images: Images.find({}, {sort: {order: 1}}).fetch(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch()
    }
  },

  getInitialState() {
    return {
      uploader: false
    };
  },

  handleUploaderOpen() {
    if(!this.state.uploader) {
      this.setState({uploader: true});
    }
  },

  handleUploaderClose(event) {
    event.stopPropagation();
    this.setState({uploader: false});
  },

  render() {
    let {currentUser, project, comments, images} = this.data;
    let projectId = project._id;
    let canEdit = currentUser ? this._canEdit(currentUser._id, project.created_by) : false;
    return (
      <div
        className="project wrapper"
        onDragOver={this.handleUploaderOpen}
        onDragEnd={this.handleUploaderOpen}
        onDrop={this.handleUploaderClose}>
        <Header
          title={<InlineEdit
                    defaultValue={project.name}
                    method="editProjectName"
                    parentId={projectId}
                    toast="Project name updated..."
                    canEdit={canEdit}/>}>
          <PanelNav
            currentUser={currentUser}
            contentTypes={panelNavTypes}
            onClick={this.handlePanelOpen}
            commentCount={comments.length}/>
        </Header>
        <Container hasPanel={this.state.panel}>
          <Main>
            {images.length > 0 ?
              <Thumbnails images={images} canEdit={canEdit}/>
            :
              <div className="project__no-content">
                <h3>Let's get this show on the road...</h3>
                <button onClick={this.handleUploaderOpen}>
                  Drag an image or click to upload
                </button>
              </div>
            }
          </Main>
          {this.state.panel ?
            <Panel
              open={this.handlePanelOpen}
              close={this.handlePanelClose}
              selected={this.state.panel}
              nav={<PanelNav
                    contentTypes={panelNavTypes}
                    onClick={this.handlePanelOpen}
                    selected={this.state.panel}
                    commentCount={comments.length}
                    currentUser={currentUser}/>}>
              <span>
                {this.state.panel === 'comments' ?
                  <CommentsPanel
                    description={project.description}
                    comments={comments}
                    parentId={projectId}
                    currentUser={currentUser}
                    canEdit={canEdit}/>
                : null}
                {this.state.panel === 'settings' ?
                  <ProjectSettingsPanel
                    project={project}
                    currentUser={currentUser}
                    canEdit={canEdit}/>
                : null}
                {this.state.panel === 'account' ?
                  <AccountPanel currentUser={currentUser}/>
                : null}
              </span>
            </Panel>
          : null}
        </Container>
        {this.state.uploader && canEdit ?
          <ImageUploader
            key={1}
            parentId={projectId}
            close={this.handleUploaderClose}
            imageCount={images.length}/>
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
        DocHead.setTitle(`${Projects.findOne().name} on OhEmGee`);
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
        value: String
      });

      return Projects.update(args.id, {
        $set: {
          name: args.value
        }
      });
    }
  });
}
