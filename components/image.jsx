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
      <div className="image__wrapper">
        <header className="image__header">
          <h1>{this.data.image.name}</h1>
          <a className="image__close" href="/">✖</a>
        </header>
        <div className="image">
          <img src={this.data.image.url}/>
          <ImageUploader parentId={this.data.image._id}/>
        </div>
        <CommentsList comments={this.data.comments} parentId={this.data.image._id}/>
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
