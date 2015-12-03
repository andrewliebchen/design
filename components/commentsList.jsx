CommentsList = React.createClass({
  propTypes: {
    comments: React.PropTypes.array.isRequired,
    parentId: React.PropTypes.string.isRequired,
    canPin: React.PropTypes.bool
  },

  render() {
    let {comments, parentId, canPin} = this.props;
    return (
      <div className="comments">
        {comments.length > 0 ?
          <span>
            {comments.map((comment, i) => {
              return <SingleComment key={i} comment={comment} canPin={canPin}/>;
            })}
          </span>
        : <div className="comments__no-content">Doh, no comments yet</div>}
        <NewComment parentId={parentId}/>
      </div>
    );
  }
});
