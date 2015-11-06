const _ = lodash;

App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      projects: Projects.find({}, {sort: {created_at: -1}}).fetch()
    }
  },

  render() {
    return (
      <div className="projects wrapper">
        <Header/>
        {this.data.projects.map((project, i) => {
          return (
            <Project
              key={i}
              project={project}/>
          );
        })}
        <NewProject/>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/', {
    subscriptions() {
      this.register('projects', Meteor.subscribe('projects'));
    },

    action() {
      FlowRouter.subsReady('projects', () => {
        ReactLayout.render(App);
      });
    }
  });
}
