const Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="comment">
        <img className="comment__avatar avatar__image" src={Meteor.user().profile.avatar_src}/>
        <div className="comment__body">
          <h4>Andrew Liebchen</h4>
          <p>{this.props.comment.comment}</p>
          <footer className="comment__footer">
            <small>{moment(this.props.comment.created_at).fromNow()}</small>
          </footer>
        </div>
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
      <div className="comment comment__new">
        <img className="comment__avatar avatar__image" src={Meteor.user().profile.avatar_src}/>
        <div className="comment__body">
          <input onKeyUp={this.handleKeyUp}/>
        </div>
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
