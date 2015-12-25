Thumbnail = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired,
    dragStart: React.PropTypes.func,
    dragEnd: React.PropTypes.func,
    dragOver: React.PropTypes.func,
    dropTarget: React.PropTypes.bool,
    canEdit: React.PropTypes.bool,
    panel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ])
  },

  getInitialState() {
    return {
      loaded: false
    };
  },

  handleImageClick() {
    let imageUrl = `/images/${this.props.image._id}`;
    FlowRouter.go(this.props.panel ? `${imageUrl}?show=${this.props.panel}` : imageUrl);
  },

  handleImageDelete(event) {
    event.stopPropagation();
    if (window.confirm('Do you really want to delete this image?')) {
      Meteor.call('deleteImage', this.props.image._id, (error, success) => {
        Session.set('toast', 'That image is outta here!')
      });
    }
  },

  componentDidMount() {
    let image = React.findDOMNode(this.refs.image);
    ImageLoaded(image, (err, alreadyLoaded) => {
      this.setState({loaded: true});
    });
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
          {canEdit ?
            <div className="thumbnail__actions">
              <Block
                className="delete"
                onClick={this.handleImageDelete}
                size="small"
                label="Delete image">
                <Icon type="trash" size={1.5}/>
              </Block>
            </div>
          : null}
        </div>
        <img
          src={image.src}
          className="thumbnail__image"
          ref="image"
          style={{opacity: this.state.loaded ? 1 : 0}}/>
        {this.state.loaded ? null : <Loading/>}
      </div>
    );
  }
});
