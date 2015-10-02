Thumbnail = React.createClass({
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
        <img src={image.url}/>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteImage(id) {
      Images.remove(id);
    }
  });
}