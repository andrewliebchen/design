ProjectThumbnail = React.createClass({
  render() {
    let {project} = this.props;
    return (
      <div className="project">
        <img className="project__cover-image" src={project.cover_image}/>
        <a href={`/projects/${project._id}`}>{project.name}</a>
      </div>
    );
  }
});
