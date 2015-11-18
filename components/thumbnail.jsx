Thumbnail = React.createClass({
  propTypes: {
    image: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      actions: false
    }
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
      <div className="project__thumbnail" onMouseEnter={this.toggleActions} onMouseLeave={this.toggleActions}>
        {this.state.actions ?
          <div className="project__thumbnail__actions">
            <span onClick={this.handleImageDelete}>Delete</span>
            <a href={`/images/${image._id}`}>View</a>
          </div>
        : null}
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
