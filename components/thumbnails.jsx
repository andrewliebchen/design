// How to force update of thumbnails on upload?

Thumbnails = React.createClass({
  propTypes: {
    images: React.PropTypes.array.isRequired
  },

  render() {
    let {images} = this.props;
    return (
      <div className="project__thumbnails">
        {images.length > 0 ? images.map((image, i) => {
          return <Thumbnail key={i} image={image}/>;
        }) : <span>No images</span>}
      </div>
    );
  }
});
