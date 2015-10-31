Project = React.createClass({
  propTypes: {
    project: React.PropTypes.object.isRequired,
    images: React.PropTypes.array,
    comment: React.PropTypes.array
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  renderEditing() {
    let {project} = this.props;
    return (
      <div>
        <label>Name</label>
        <input type="text" defaultValue={project.name} ref="name"/>
        <label>Description</label>
        <textarea defaultValue={project.description} ref="description"/>
        <button onClick={this.handleSaveProject}>Save</button>
      </div>
    );
  },

  renderHeader() {
    let {project} = this.props;
    return (
      <header className="project__header">
        <h2 className="project__title">
          <a href={`/projects/${project._id}`}>{project.name}</a>
        </h2>
        <p className="project__description">{project.description}</p>
        <ul className="project__actions">
          <li onClick={this.handleEditToggle}>Edit</li>
          <li onClick={this.handleDelete}>Delete</li>
        </ul>
      </header>
    );
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  handleDelete() {
    Meteor.call('deleteProject', this.props.project._id);
  },

  handleSaveProject() {
    let projectName = React.findDOMNode(this.refs.name).value;
    let projectDescription = React.findDOMNode(this.refs.description).value;

    Meteor.call('editProject', {
      id: this.props.project._id,
      name: projectName,
      description: projectDescription
    }, (error, success) => {
      if(success) {
        this.setState({editing: false});
      }
    });
  },

  render() {
    let {project, images, comments} = this.props;
    return (
      <div className="project">
        {this.state.editing ? this.renderEditing() : this.renderHeader()}
        <ImageUploader parentId={project._id}/>
        <div className="project__thumbnails">
          {images.length > 0 ? images.map((image, i) => {
            return <Thumbnail key={i} image={image}/>;
          }) : <span>No images</span>}
        </div>
        <CommentsList comments={comments} parentId={project._id}/>
      </div>
    );
  }
});

SingleProject = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      project: Projects.findOne(),
      images: Images.find().fetch(),
      comments: Comments.find().fetch()
    }
  },

  render() {
    return (
      <Project
        project={this.data.project}
        images={this.data.images}
        comments={this.data.comments}/>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/projects/:_id', {
    subscriptions(params) {
      this.register('singleProject', Meteor.subscribe('singleProject', params._id));
    },

    action(params) {
      FlowRouter.subsReady('singleProject', () => {
        ReactLayout.render(SingleProject);
      });
    }
  });
}

if(Meteor.isServer) {
  Meteor.methods({
    deleteProject(id) {
      check(id, {
        id: String
      });

      Projects.remove(id);
    },

    editProject(args) {
      check(args, {
        id: String,
        name: String,
        description: String
      });

      return Projects.update(args.id, {
        $set: {
          name: args.name,
          description: args.description
        }
      });
    }
  });
}
