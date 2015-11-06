Thumbnails = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    parentId: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let images = Meteor.subscribe('images', this.props.parentId);

    return {
      loading: !images.ready(),
      images: Images.find({parent: this.props.parentId}, {sort: {created_at: 1}}).fetch()
    };
  },

  render() {
    if (this.data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div className="project__thumbnails">
        {this.data.images.length > 0 ? this.data.images.map((image, i) => {
          return <Thumbnail key={i} image={image}/>;
        }) : <span>No images</span>}
      </div>
    );
  }
});
