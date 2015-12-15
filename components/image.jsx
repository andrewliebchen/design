const panelNavTypes = ['comments', 'settings'];

Image = React.createClass({
  mixins: [ReactMeteorData, PanelMixin, CanEditMixin],

  getMeteorData() {
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
    return (
      <div className="image wrapper">
        <Header
          title={<span>{image.name}</span>}
          parentTitle={project.name}
          parentLink={`/${image.parent}`}>
          <PanelNav
            contentTypes={panelNavTypes}
            onClick={this.handlePanelOpen}
            commentCount={comments.length}
            currentUser={currentUser}/>
        </Header>
        <Container hasPanel={this.state.panel}>
          <Main className="image__main">
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
        DocHead.setTitle(`${Images.findOne().name} on OhEmGee`);
        ReactLayout.render(Image);
      });
    }
  });
}
