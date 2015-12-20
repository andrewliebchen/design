 const panelNavTypes = ['comments', 'settings'];

Image = React.createClass({
  mixins: [ReactMeteorData, PanelMixin, CanEditMixin],

  getMeteorData() {
    DocHead.setTitle(`${Images.findOne().name} on OhEmGee`);
    return {
      currentUser: Meteor.user(),
      image: Images.findOne(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch(),
      project: Projects.findOne()
    };
  },

  render() {
    let {currentUser, comments, image, project} = this.data;
    let canEdit = currentUser ? this._canEdit(currentUser._id, project.created_by) : false;
    let parentLink = this.state.panel ? `/${image.parent}?show=${this.state.panel}` : `/${image.parent}`;
    return (
      <div className="image wrapper">
        <Header
          hasPanel={this.state.panel ? true : false}
          title={<a href={parentLink}>{project.name}</a>}>
          <PanelNav
            contentTypes={panelNavTypes}
            onClick={this.handlePanelOpen}
            commentCount={comments.length}
            currentUser={currentUser}/>
        </Header>
        <Container hasPanel={this.state.panel}>
          <Main className="image__main">
            <header className="image__header">
              <h3 className="image__title">
                <InlineEdit
                  defaultValue={image.name}
                  method="editImageName"
                  parentId={image._id}
                  toast="Image name updated..."
                  canEdit={canEdit}/>
              </h3>
            </header>
            <Pins
              parentId={image._id}
              panel={this.state.panel}
              imageSrc={image.src}/>
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
                    description={image.description}
                    comments={comments}
                    parentId={image._id}
                    currentUser={currentUser}
                    canEdit={canEdit}
                    canPin />
                : null}
                {this.state.panel === 'settings' ?
                  <ImageSettingsPanel
                    imageId={image._id}
                    parentId={project._id}
                    canEdit={canEdit} />
                : null}
                {this.state.panel === 'account' ?
                  <AccountPanel currentUser={currentUser}/>
                : null}
              </span>
            </Panel>
          : null}
        </Container>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/images/:_id', {
    subscriptions(params) {
      this.register('image', Meteor.subscribe('image', params._id));
    },

    action(params) {
      FlowRouter.subsReady('image', () => {
        ReactLayout.render(Image);
      });
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    editImageName(args) {
      check(args, {
        id: String,
        value: String
      });

      return Images.update(args.id, {
        $set: {
          name: args.value
        }
      });
    }
  });
}
