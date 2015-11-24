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
      <div className="thumbnail">
        <div className="thumbnail__overlay" onClick={this.handleImageClick}>
          <span className="thumbnail__overlay__label">View Image</span>
          <div className="thumbnail__actions">
            <a onClick={this.handleImageDelete}><Icon type="trash"/></a>
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
