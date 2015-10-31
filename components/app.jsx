const _ = lodash;

App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      projects: Projects.find({}, {sort: {created_at: -1}}).fetch(),
      images: Images.find({}, {sort: {created_at: 1}}).fetch(),
      comments: Comments.find({}, {sort: {created_at: -1}}).fetch()
    }
  },

  render() {
    return (
      <div className="projects wrapper">
        <header className="header">
          <a href="/">Design</a>
        </header>
        {this.data.projects.map((project, i) => {
          return (
            <Project
              key={i}
              project={project}
              images={_.filter(this.data.images, {parent: project._id})}
              comments={_.filter(this.data.comments, {parent: project._id})}/>
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
