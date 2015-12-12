Thumbnail = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired,
    canEdit: React.PropTypes.bool
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
    let {image, canEdit} = this.props;
    return (
      <div className="thumbnail">
        <div className="thumbnail__overlay" onClick={this.handleImageClick}>
          <Icon type="expand" size={5} className="thumbnail__overlay__label"/>
          <div className="thumbnail__actions">
            <Block
              onClick={this.handleCommentClick}
              size="small"
              label="Image comments">
              <Icon type="comments" size={1.5}/>
            </Block>
            {canEdit ?
              <Block
                className="delete"
                onClick={this.handleImageDelete}
                size="small"
                label="Delete image">
                <Icon type="trash" size={1.5}/>
              </Block>
            : null}
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
