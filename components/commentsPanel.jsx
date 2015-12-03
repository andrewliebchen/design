CommentsPanel = React.createClass({
  propTypes: {
    description: React.PropTypes.string,
    comments: React.PropTypes.array,
    parentId: React.PropTypes.string
  },

  handleEditDescription(event) {
    Meteor.call('editProjectDescription', {
      id: this.props.parentId,
      description: event.target.value
    });
  },

  render() {
    let {description, comments, parentId} = this.props;
    return (
      <div className="panel__content panel__content_comments">
        <div className="project__description">
          <InlineEdit html={description ? description : 'Click to add a description'} onChange={this.handleEditDescription}/>
        </div>
        <CommentsList comments={comments} parentId={parentId}/>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    editProjectDescription(args) {
      check(args, {
        id: String,
        description: String,
      });

      return Projects.update(args.id, {
        $set: {
          description: args.description
        }
      });
    }
  });
}
