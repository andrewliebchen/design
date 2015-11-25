ProjectThumbnail = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired
  },

  handleProjectClick() {
    FlowRouter.go(`/projects/${this.props.project._id}`);
  },

  render() {
    let {project} = this.props;
    return (
      <div className="thumbnail thumbnail_project">
        <div className="thumbnail__overlay" onClick={this.handleProjectClick}>
          <span className="thumbnail__overlay__label">View Project</span>
          <div className="thumbnail__actions">
          </div>
        </div>
        {project.cover_image ?
          <img src={project.cover_image}/>
        :
          <div className="thumbnail__no-image">
            <Icon type="image" size={8}/>
          </div>
        }
        <h2 className="thumbnail__title">{project.name}</h2>
      </div>
    );
  }
});
