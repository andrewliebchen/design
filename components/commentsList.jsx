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
        {comments ? comments.map((comment, i) => {
          return <SingleComment key={i} comment={comment} canPin={canPin}/>;
        }) : <span>No comments</span>}
        <NewComment parentId={parentId}/>
      </div>
    );
  }
});
