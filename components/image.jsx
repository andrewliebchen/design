if(Meteor.isClient) {
  Session.setDefault('pinning', false);
}

Image = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      image: Images.findOne()
    };
  },

  getInitialState() {
    return {
      showPins: true
    };
  },

  handleShowPinToggle() {
    this.setState({showPins: !this.state.showPins});
  },

  render() {
    let uploadedBy = Meteor.users.findOne(this.data.image.uploaded_by);
    return (
      <div className="image">
        <div className="image__main">
          <header className="image__header">
            <a className={classnames('pin__toggle', {'show-pins': this.state.showPins})}
              onClick={this.handleShowPinToggle}/>
          </header>
          <div className="image__container">
            <img src={this.data.image.src}/>
            {this.state.showPins ? <Pins parentId={this.data.image._id}/> : null}
          </div>
          {/*<ImageUploader parentId={this.data.image._id}/>*/}
        </div>
        <aside className="image__aside">
          <h1 className="image__title">{this.data.image.name}</h1>
          {uploadedBy ? <Avatar user={uploadedBy}/> : null}
          {this.data.image.description ?
            <p>{this.data.image.description}</p>
          : null}
          <CommentsList parentId={this.data.image._id} canPin/>
        </aside>
        <a className="image__close" href="/">✖</a>

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
