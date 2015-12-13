Thumbnails = React.createClass({
  propTypes: {
    images: React.PropTypes.array.isRequired,
    canEdit: React.PropTypes.bool
  },

  render() {
    let {images, canEdit} = this.props;
    return (
      <div className="thumbnails">
        {images.map((image, i) => {
          return (
            <Thumbnail
              key={i}
              image={image}
              canEdit={canEdit}/>
          );
        })}
      </div>
    );
  }
});
