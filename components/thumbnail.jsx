Thumbnail = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      actions: false
    }
  },

  handleImageClick() {
    FlowRouter.go(`/images/${this.props.image._id}`);
  },

  handleImageDelete() {
    Meteor.call('deleteImage', this.props.image._id);
  },

  toggleActions() {
    this.setState({actions: !this.state.actions});
  },

  render() {
    let {image} = this.props;
    return (
      <div className="thumbnail" onClick={this.handleImageClick}>
        <div className="thumbnail__actions">
          <a onClick={this.handleImageDelete}>Delete</a>
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
