ProjectList = React.createClass({
  propTypes: {
    projects: React.PropTypes.array
  },

  handleDeleteProject(id) {
    if (window.confirm('Do you really want to delete this project?')) {
      Meteor.call('deleteProject', id);
    }
  },

  render() {
    let {projects} = this.props;
    return (
      <div className="card">
        <h3 className="card__title">Projects</h3>
        {projects.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Created</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => {
                let createdBy = Meteor.users.findOne(project.created_by);
                return (
                  <tr key={i}>
                    <th>{project.name ? project.name : 'Untitled'}</th>
                    <td>
                      {createdBy ?
                        <span>
                          <Avatar size="tiny" user={createdBy}/> {createdBy.profile.name}
                        </span>
                      : <span>???</span>}
                    </td>
                    <td>{moment(project.created_at).fromNow()}</td>
                    <td>
                      <button
                        className="small negative"
                        onClick={this.handleDeleteProject.bind(null, project._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        : <strong>No projects</strong>}
      </div>
    );
  }
})
