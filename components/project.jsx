Project = React.createClass({
  mixins: [ReactMeteorData, PanelMixin, CanEditMixin],

  getMeteorData() {
    let project = Projects.findOne();
    if(!project) {
      return {
        notFound: true
      };
    }

    let documentTitle = project.name ? `${project.name} on OhEmGee` : 'OhEmGee';
    DocHead.setTitle(documentTitle);
    return {
      currentUser: Meteor.user(),
      project: project,
      images: Images.find({}, {sort: {order: 1}}).fetch(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch()
    }
  },

  getInitialState() {
    return {
      uploader: false,
      panelNavTypes: ['comments', 'settings']
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
    if(this.data.notFound) {
      return <NotFound/>
    }

    let {currentUser, project, comments, images} = this.data;
    let projectId = project._id;
    let canEdit = currentUser ? this._canEdit(currentUser._id, project.created_by) : false;
    let showOnboarding = currentUser && !currentUser.profile.onboarded && canEdit;
    return (
      <div
        className="project wrapper"
        onDragOver={this.handleUploaderOpen}
        onDragEnd={this.handleUploaderOpen}
        onDrop={this.handleUploaderClose}>
        <Header
          hasPanel={this.state.panel}
          brandLink={`/${project._id}`}
          title={<InlineEdit
                    defaultValue={project.name}
                    method="editProjectName"
                    parentId={projectId}
                    toast="Project name updated..."
                    canEdit={canEdit}/>}>
          <PanelNav
            currentUser={currentUser}
            contentTypes={this.state.panelNavTypes}
            onClick={this.handlePanelOpen}
            commentCount={comments.length}/>
        </Header>
        <Container hasPanel={this.state.panel}>
          <Main>
            {images.length > 0 ?
              <Thumbnails
                images={images}
                canEdit={canEdit}
                panel={this.state.panel}/>
            : showOnboarding ?
              <Onboarding show={showOnboarding} currentUserId={currentUser._id}/>
            :
              <div className="onboarding">
                <button
                  className="onboarding__button"
                  onClick={this.handleUploaderOpen}>
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
                    contentTypes={this.state.panelNavTypes}
                    onClick={this.handlePanelOpen}
                    selected={this.state.panel}
                    commentCount={comments.length}
                    currentUser={currentUser}/>}>
              <span>
                {this.state.panel === 'comments' ?
                  <CommentsPanel
                    description={project.description}
                    descriptionMethod="editImageDescription"
                    comments={comments}
                    parentId={projectId}
                    parentType="project"
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
                  <AccountPanel currentUser={currentUser} projectId={project._id}/>
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
    },

    editProjectDescription(args) {
      check(args, {
        id: String,
        value: String,
      });

      return Projects.update(args.id, {
        $set: {
          description: args.value
        }
      });
    }
  });
}
