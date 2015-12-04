Thumbnail = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      imageUrl: `/images/${this.props.image._id}`
    };
  },

  handleImageClick() {
    FlowRouter.go(this.state.imageUrl);
  },

  handleCommentClick(event) {
    event.stopPropagation();
    FlowRouter.go(`${this.state.imageUrl}?show=comments`);
  },

  handleImageDelete(event) {
    event.stopPropagation();
    if (window.confirm('Do you really want to delete this image?')) {
      Meteor.call('deleteImage', this.props.image._id);
    }
  },

  render() {
    let {image} = this.props;
    return (
      <div className="thumbnail">
        <div className="thumbnail__overlay" onClick={this.handleImageClick}>
          <Icon type="expand" size={5} className="thumbnail__overlay__label"/>
          <div className="thumbnail__actions">
            <Icon
              type="comments"
              className="action block"
              onClick={this.handleCommentClick}
              size={1}/>
            <Icon
              type="trash"
              className="action delete block"
              onClick={this.handleImageDelete}
              size={1}/>
          </div>
        </div>
        <img src={image.src}/>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteImage(id) {
      check(id, String);
      Images.remove(id);
    }
  });
}
