ProjectsList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let projects = Meteor.subscribe('projects', Meteor.user().profile.team);

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
        <Header>
          <h2 className="header__title">Projects</h2>
        </Header>
        <div className="thumbnails thumbnails_project">
          {this.data.projects.map((project, i) => {
            return (
              <ProjectThumbnail project={project} key={i}/>
            );
          })}
        </div>
        <NewProject/>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/', {
    action() {
      ReactLayout.render(Layout, {
        content: <ProjectsList/>
      });
    }
  });
}
