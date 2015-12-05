const CSSTransitionGroup = React.addons.CSSTransitionGroup;

Project = React.createClass({
  mixins: [ReactMeteorData, PanelMixin],

  getMeteorData() {
    return {
      project: Projects.findOne(),
      images: Images.find({}, {sort: {created_at: 1}}).fetch(),
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

  handleEditName(event) {
    Meteor.call('editProjectName', {
      id: this.data.project._id,
      name: event.target.value
    }, (error, success) => {
      if(success){
        Session.set('toast', 'Project name updated...');
      }
    });
  },

  render() {
    let {project, comments, images} = this.data;
    let projectId = project._id;
    return (
      <div
        className="project wrapper"
        onDragOver={this.handleUploaderOpen}
        onDragEnd={this.handleUploaderOpen}
        onDrop={this.handleUploaderClose}>
        <Header title={<InlineEdit
                        html={project.name}
                        onChange={this.handleEditName}/>}>
          <PanelNav
            contentTypes={['comments', 'settings']}
            onClick={this.handlePanelOpen}
            commentCount={comments.length}/>
        </Header>
        <Container hasPanel={this.state.panel}>
          <Main>
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
          </Main>
          {this.state.panel ?
            <Panel
              open={this.handlePanelOpen}
              close={this.handlePanelClose}
              selected={this.state.panel}
              nav={<PanelNav
                    contentTypes={['comments', 'settings']}
                    onClick={this.handlePanelOpen}
                    selected={this.state.panel}
                    commentCount={comments.length}/>}>
              <span>
                {this.state.panel === 'comments' ?
                  <CommentsPanel
                    description={project.description}
                    comments={comments}
                    parentId={projectId}/>
                : null}
                {this.state.panel === 'settings' ?
                  <SettingsPanel project={project}/>
                : null}
                {this.state.panel === 'account' ? <AccountPanel user={Meteor.user()}/> : null}
              </span>
            </Panel>
          : null}
        </Container>
        {this.state.uploader ?
          <ImageUploader key={1} parentId={projectId} close={this.handleUploaderClose}/>
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
