Thumbnail = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired,
    dragStart: React.PropTypes.func,
    dragEnd: React.PropTypes.func,
    dragOver: React.PropTypes.func,
    dropTarget: React.PropTypes.bool,
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
      Meteor.call('deleteImage', this.props.image._id, (error, success) => {
        Session.set('toast', 'That image is outta here!')
      });
    }
  },

  render() {
    let {image, index, imageCount, dropTarget, canEdit} = this.props;
    let thumbnailClassName = classnames({
      'thumbnail': true,
      'is-drop-target': dropTarget
    });
    return (
      <div
        className={thumbnailClassName}
        onDragStart={this.props.dragStart.bind(null, image._id)}
        onDragEnd={this.props.dragEnd.bind(null, image._id)}
        onDragOver={this.props.dragOver.bind(null, image._id)}
        draggable={true}>
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
