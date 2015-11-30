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
      pins: true,
      sidebar: true
    };
  },

  handleShowPinToggle() {
    this.setState({pins: !this.state.pins});
  },

  handleSidebarToggle() {
    this.setState({sidebar: !this.state.sidebar});
  },

  render() {
    let {comments, image} = this.data;
    let uploadedBy = Meteor.users.findOne(image.uploaded_by);
    return (
      <div className="image">
        <header className="header image__header">
          <div className="block">
            <a className={classnames('pin__toggle', {'show-pins': this.state.pins})}
              onClick={this.handleShowPinToggle}/>
          </div>
          <h2 className="header__title">{image.name}</h2>
          <a className={`block${this.state.sidebar ? ' is-selected' : ''}`} onClick={this.handleSidebarToggle}>
            <Icon type="comments"/>
          </a>
          <a className="block" href={`../projects/${image.parent}`}>
            <Icon type="close"/>
          </a>
        </header>
        <div className="image__wrapper">
          <div className="image__container">
            <img src={image.src}/>
            {this.state.pins ? <Pins parentId={image._id}/> : null}
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
      this.register('singleImage', Meteor.subscribe('singleImage', params._id));
    },

    action(params) {
      FlowRouter.subsReady('singleImage', () => {
        ReactLayout.render(Layout, {
          content: <Image/>
        });
      });
    }
  });
}
