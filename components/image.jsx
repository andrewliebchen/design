Image = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      image: Images.findOne()
    };
  },

  handleAddPin() {
    console.log("pin");
  },

  render() {
    let uploadedBy = Meteor.users.findOne(this.data.image.uploaded_by);
    return (
      <div className="image">
        <a className="image__close" href="/">✖</a>
        <div className="image__container">
          <div className="image__main">
            <span className="image__pin-container">
              <img src={this.data.image.src}/>
              <Pins parentId={this.data.image._id}/>
            </span>
            {/*<ImageUploader parentId={this.data.image._id}/>*/}
          </div>
          <aside className="image__aside">
            <h1 className="image__title">{this.data.image.name}</h1>
            {uploadedBy ? <Avatar user={uploadedBy}/> : null}
            {this.data.image.description ?
              <p>{this.data.image.description}</p>
            : null}
            <CommentsList parentId={this.data.image._id} addPin={this.handleAddPin}/>
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
