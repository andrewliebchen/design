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
  propTypes: {
    parentId: React.PropTypes.string.isRequired
  },

  handleCreateComment(event) {
    event.preventDefault();

    let comment = React.findDOMNode(this.refs.comment).value;
    Meteor.call('newComment', {
      comment: comment,
      created_at: Date.now(),
      parent: this.props.parentId
    }, (error, success) => {
      if(success) {
        comment = '';
      }
    });
  },

  render() {
    return (
      <div>
        <label>Your comment</label>
        <textarea ref="comment"></textarea>
        <button onClick={this.handleCreateComment}>Comment</button>
      </div>
    );
  }
});

CommentsList = React.createClass({
  propTypes: {
    comments: React.PropTypes.array,
    parentId: React.PropTypes.string
  },

  render() {
    let {comments, parentId} = this.props;
    return (
      <div className="comments">
        <h3>Comments</h3>
        {comments ? comments.map((comment, i) => {
          return <Comment key={i} comment={comment}/>;
        }) : <span>No comments</span>}
        <NewComment parentId={this.props.parentId}/>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    newComment(args) {
      return Comments.insert(args);
    }
  });
}
