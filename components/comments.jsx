const Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="comment">
        <p>{this.props.comment.comment}</p>
      </div>
    );
  }
})

const NewComment = React.createClass({
  render() {
    return (
      <form>
        <label>Your comment</label>
        <textarea ref="comment"></textarea>
        <input type="submit" onSubmit={this.handleCreateComment}/>
      </form>
    );
  }
});

CommentsList = React.createClass({
  propTypes: {
    comments: React.PropTypes.array,
    projectId: React.PropTypes.string
  },

  render() {
    let {comments, projectId} = this.props;
    return (
      <div className="comments">
        <h3>Comments</h3>
        {comments ? comments.map((comment, i) => {
          return <Comment key={i} comment={comment}/>;
        }) : <span>No comments</span>}
        <NewComment/>
      </div>
    );
  }
});
