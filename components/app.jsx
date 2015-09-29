const _ = lodash;

App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      projects: Projects.find().fetch(),
      images: Images.find().fetch()
    }
  },

  render() {
    return (
      <div className="projects wrapper">
        {this.data.projects.map((project, i) => {
          return (
            <Project
              key={i}
              project={project}
              images={_.filter(this.data.images, {parent: project._id})}/>
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
