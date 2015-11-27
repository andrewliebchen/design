ProjectForm = React.createClass({
  propTypes: {
    project: React.PropTypes.object
  },

  handleCreateProject() {
    let projectName = React.findDOMNode(this.refs.name).value;
    let projectDescription = React.findDOMNode(this.refs.description).value;

    Meteor.call('newProject', {
      name: projectName,
      description: projectDescription,
      created_at: Date.now(),
      created_by: Meteor.user()._id,
      parent: Meteor.user().profile.team
    }, (error, success) => {
      if(success) {
        React.findDOMNode(this.refs.name).value = '';
        React.findDOMNode(this.refs.description).value = '';
      }
    });
  },

  render() {
    let {project} = this.props;
    return (
      <div className="new-project__form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" ref="name" required/>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea ref="description"/>
        </div>
        <button onClick={this.handleCreateProject}>Save</button>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    newProject(args) {
      check(args, {
        name: String,
        description: String,
        created_at: Number,
        created_by: String,
        parent: String
      });

      return Projects.insert(args);
    }
  });
}
