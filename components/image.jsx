Image = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      image: Images.findOne(),
      comments: Comments.find().fetch()
    };
  },

  render() {
    return (
      <div className="image">
        <a className="image__close" href="/">✖</a>
        <div className="image__container">
          <div className="image__main">
            <img src={this.data.image.src}/>
            {/*<ImageUploader parentId={this.data.image._id}/>*/}
          </div>
          <aside className="image__aside">
            <h1 className="image__title">{this.data.image.name}</h1>
            <CommentsList comments={this.data.comments} parentId={this.data.image._id}/>
          </aside>
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
        ReactLayout.render(Image);
      });
    }
  });
}
