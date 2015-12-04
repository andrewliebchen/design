Image = React.createClass({
  mixins: [ReactMeteorData, PanelMixin],

  getMeteorData() {
    return {
      image: Images.findOne(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch(),
      projectName: Projects.findOne().name
    };
  },

  render() {
    let {comments, image, projectName} = this.data;
    return (
      <div className="image wrapper">
        <Header
          title={<span>{image.name}</span>}
          parentTitle={projectName}
          parentLink={`/${image.parent}`}>
          <PanelNav contentTypes={['comments']} onClick={this.handlePanelOpen}/>
        </Header>
        <Container hasPanel={this.state.panel}>
          <Main className="image__main">
            <img className="image__img" src={image.src}/>
            {this.state.panel ?
              <Pins parentId={image._id}/>
            : null}
          </Main>
          {this.state.panel ?
            <Panel
              open={this.handlePanelOpen}
              close={this.handlePanelClose}
              selected={this.state.panel}
              nav={<PanelNav
                    contentTypes={['comments']}
                    onClick={this.handlePanelOpen}
                    selected={this.state.panel}/>}>
              <span>
                {this.state.panel === 'comments' ?
                  <CommentsPanel
                    description={image.description}
                    comments={comments}
                    parentId={image._id}
                    canPin />
                : null}
                {this.state.panel === 'account' ? <AccountPanel/> : null}
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
