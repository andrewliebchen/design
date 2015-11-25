CommentsPanel = React.createClass({
  propTypes: {
    description: React.PropTypes.string,
    comments: React.PropTypes.object,
    parentId: React.PropTypes.string
  },

  render() {
    let {description, comments, parentId} = this.props;
    return (
      <div className="panel__content panel__content_comments">
        <div className="project__description">
          {description}
        </div>
        <CommentsList comments={comments} parentId={parentId}/>
      </div>
    );
  }
});
