const Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="comment">
        <ul className="comment__meta">
          <li><strong>Andrew Liebchen</strong></li>
          <li><small>{moment(this.props.comment.created_at).fromNow()}</small></li>
        </ul>
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
    let comment = React.findDOMNode(this.refs.comment).value;
    Meteor.call('newComment', {
      comment: comment,
      created_at: Date.now(),
      parent: this.props.parentId
    }, (error, success) => {
      if(success) {
        comment = '';
      } else {
        console.log(error);
      }
    });
  },

  render() {
    return (
      <div>
        <textarea ref="comment"/>
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
