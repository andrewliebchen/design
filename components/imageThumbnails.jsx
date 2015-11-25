Thumbnails = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    parentId: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let thumbnails = Meteor.subscribe('thumbnails', this.props.parentId);

    return {
      loading: !thumbnails.ready(),
      images: Images.find({parent: this.props.parentId}, {sort: {created_at: 1}}).fetch(),
    }
  },

  render() {
    if (this.data.loading) {
      return <Loading/>;
    }

    return (
      <div className="thumbnails thumbnails_image">
        {this.data.images.length > 0 ? this.data.images.map((image, i) => {
          return <Thumbnail key={i} image={image}/>;
        }) : <span>No images</span>}
      </div>
    );
  }
});
