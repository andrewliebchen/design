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

  handleKeyUp(event) {
    if(event.keyCode === 13) {
      Meteor.call('newComment', {
        comment: event.target.value,
        created_at: Date.now(),
        parent: this.props.parentId
      }, (error, success) => {
        if(error) {
          console.log(error);
        }
      });
      event.target.value = '';
    }
  },

  render() {
    return (
      <div>
        <input onKeyUp={this.handleKeyUp}/>
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
      check(args, {
        comment: String,
        created_at: Number,
        parent: String
      });

      return Comments.insert(args);
    }
  });
}
