Thumbnail = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired
  },

  handleImageClick() {
    FlowRouter.go(`/images/${this.props.image._id}`);
  },

  handleCoverImage(event) {
    event.stopPropagation();
    Meteor.call('coverImage', {
      src: this.props.image.src,
      projectId: this.props.image.parent
    }, (err, success) => {
      err ? console.warn(err) : null;
    });
  },

  handleImageDelete() {
    Meteor.call('deleteImage', this.props.image._id);
  },

  render() {
    let {image} = this.props;
    return (
      <div className="thumbnail thumbnail_image">
        <div className="thumbnail__overlay" onClick={this.handleImageClick}>
          <span className="thumbnail__overlay__label">View Image</span>
          <div className="thumbnail__actions">
            <a className="block" onClick={this.handleCoverImage}>
              <Icon type="pin"/>
            </a>
            <a className="block" onClick={this.handleImageDelete}>
              <Icon type="trash"/>
            </a>
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
    },

    coverImage(args) {
      check(args, {
        src: String,
        projectId: String
      });

      return Projects.update(args.projectId, {
        $set: {
          cover_image: args.src
        }
      });
    }
  });
}
