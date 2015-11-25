CommentsPanel = React.createClass({
  propTypes: {
    description: React.PropTypes.string,
    comments: React.PropTypes.array,
    parentId: React.PropTypes.string
  },

  render() {
    let {description, comments, parentId} = this.props;
    return (
      <div className="panel__content panel__content_comments">
        <div className="project__description">
          <InlineEdit html={description} onChange={this.handleEditTitle}/>
        </div>
        <CommentsList comments={comments} parentId={parentId}/>
      </div>
    );
  }
});
