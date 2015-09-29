ProjectForm = React.createClass({
  propTypes: {
    project: React.PropTypes.object
  },

  handleSaveProject() {
    let projectName = React.findDOMNode(this.refs.name).value;
    let projectDescription = React.findDOMNode(this.refs.description).value;

    Meteor.call('newProject', {
      name: projectName,
      description: projectDescription,
      created_at: Date.now()
    }, (error, success) => {
      if(success) {
        projectName = '';
        projectDescription = '';
      }
    });
  },

  render() {
    let {project} = this.props;
    return (
      <div>
        <label>Name</label>
        <input type="text" value={project ? project.name : null} ref="name"/>
        <label>Description</label>
        <textarea value={project ? project.description : null} ref="description"/>
        <button onClick={this.handleSaveProject}>Save</button>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    newProject(args) {
      return Projects.insert(args);
    }
  });
}
