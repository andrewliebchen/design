Image = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      image: Images.findOne(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch()
    };
  },

  getInitialState() {
    return {
      panel: FlowRouter.getQueryParam('show') === 'comments'
    };
  },

  handlePanelToggle() {
    this.setState({panel: !this.state.panel});
    FlowRouter.setQueryParams({show: this.state.panel ? null : 'comments'});
  },

  render() {
    let {comments, image} = this.data;
    let containerClassName = classnames({
      "container": true,
      "has-panel": this.state.panel
    });
    
    return (
      <div className="image wrapper">
        <header className="header">
          <h2 className="header__title">{image.name}</h2>
          <a className="block" href={`/${image.parent}`}><Icon type="arrowLeft"/></a>
          <nav className="panel-nav">
            <Icon
              type="comments"
              className={`block action${this.state.panel ? ' is-selected' : ''}`}
              onClick={this.handlePanelToggle}/>
          </nav>
        </header>
        <div className={containerClassName}>
          <div className="main image__main">
            <img className="image__img" src={image.src}/>
            {this.state.panel ?
              <Pins parentId={image._id}/>
            : null}
          </div>
          {this.state.panel ?
            <aside className="image__sidebar panel">
              <div className="image__sidebar__content">
                {image.description ?
                  <p>{image.description}</p>
                : null}
                <CommentsList comments={comments} parentId={image._id} canPin/>
              </div>
            </aside>
          : null}
        </div>
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
