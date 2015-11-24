ProjectsList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let projects = Meteor.subscribe('projects', Meteor.userId());

    return {
      loading: !projects.ready(),
      projects: Projects.find({}, {sort: {created_at: -1}}).fetch()
    }
  },

  render() {
    if (this.data.loading) {
      return <Loading/>;
    }

    return (
      <div className="projects">
        {this.data.projects.map((project, i) => {
          return (
            <div key={i}>
              <a href={`/projects/${project._id}`}>{project.name}</a>
            </div>
          );
        })}
      </div>
    );
  }
});
