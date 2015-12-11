Image = React.createClass({
  mixins: [ReactMeteorData, PanelMixin],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      image: Images.findOne(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch(),
      projectName: Projects.findOne().name
    };
  },

  render() {
    let {currentUser, comments, image, projectName} = this.data;
    return (
      <div className="image wrapper">
        <Header
          title={<span>{image.name}</span>}
          parentTitle={projectName}
          parentLink={`/${image.parent}`}>
          <PanelNav
            contentTypes={['comments']}
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
                    contentTypes={['comments']}
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
                    canPin />
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
