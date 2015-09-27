Project = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired,
    images: React.PropTypes.array
  },

  render() {
    return (
      <div className="project">
        <h2>{this.props.project.name}</h2>
        {this.props.images.map((image, i) => {
          return <img key={i} src={image.url}/>;
        })}
      </div>
    );
  }
});
