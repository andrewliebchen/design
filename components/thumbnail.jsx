Thumbnail = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired
  },

  handleImageClick() {
    FlowRouter.go(`/images/${this.props.image._id}`);
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
              type="trash"
              className="thumbnail__action delete block"
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
