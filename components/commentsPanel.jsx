CommentsPanel = React.createClass({
  propTypes: {
    description: React.PropTypes.string,
    comments: React.PropTypes.array,
    parentId: React.PropTypes.string,
    canPin: React.PropTypes.bool
  },

  handleEditDescription(event) {
    Meteor.call('editProjectDescription', {
      id: this.props.parentId,
      description: event.target.value
    }, (error, success) => {
      if(success){
        Session.set('toast', 'Description up to date!');
      }
    });
  },

  render() {
    let {description, comments, parentId, canPin} = this.props;
    return (
      <div className="panel__content panel__content_comments">
        <div className="project__description">
          <h3>Description</h3>
          <InlineEdit
            html={description}
            onChange={this.handleEditDescription}/>
        </div>
        <CommentsList
          comments={comments}
          parentId={parentId}
          canPin={canPin}/>
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
