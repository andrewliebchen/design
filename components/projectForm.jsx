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
    return (
      <form>
        <label>Name</label>
        <input type="text" value={this.props.project.name} ref="name"/>
        <label>Description</label>
        <textarea ref="description" value={this.props.project.description}/>
        <input type="submit" onClick={this.handleSaveProject}/>
      </form>
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
