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
      sidebar: FlowRouter.getQueryParam('show') === 'comments'
    };
  },

  handleSidebarToggle() {
    this.setState({sidebar: !this.state.sidebar});
    FlowRouter.setQueryParams({show: this.state.sidebar ? null : 'comments'});
  },

  render() {
    let {comments, image} = this.data;
    return (
      <div className="image wrapper">
        <header className="header">
          <h2 className="header__title">{image.name}</h2>
          <a className="block" href={`/${image.parent}`}><Icon type="arrowLeft"/></a>
          <nav className="panel-nav">
            <Icon
              type="comments"
              className={`block action${this.state.sidebar ? ' is-selected' : ''}`}
              onClick={this.handleSidebarToggle}/>
          </nav>
        </header>
        <div className="image__wrapper">
          <div className="image__container">
            <img src={image.src}/>
            {this.state.sidebar ?
              <Pins parentId={image._id}/>
            : null}
          </div>
          {this.state.sidebar ?
            <aside className="image__sidebar">
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
