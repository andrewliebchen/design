const CSSTransitionGroup = React.addons.CSSTransitionGroup;

CommentsList = React.createClass({
  mixins: [AccountActionsMixin],

  propTypes: {
    comments: React.PropTypes.array.isRequired,
    parentId: React.PropTypes.string.isRequired,
    currentUser: React.PropTypes.object,
    canPin: React.PropTypes.bool,
    canEdit: React.PropTypes.bool
  },

  getInitialState() {
    return {
      editComment: null
    };
  },

  handleCommentEdit(comment) {
    // Presume we've subscribed to Comments
    let editComment = Comments.findOne(comment);
    this.setState({editComment: editComment});
  },

  handleKeyUp(event) {
    let method = this.state.editComment ? 'editComment' : 'newComment';

    if(event.keyCode === 13) {
      Meteor.call(method, {
        id: this.state.editComment ? this.state.editComment._id : null,
        comment: event.target.value,
        created_at: Date.now(),
        created_by: Meteor.user()._id,
        parent: this.props.parentId
      }, (error, success) => {
        if(error) {
          console.log(error);
        }

        if(success && this.state.editComment) {
          Session.set('toast', 'Comment updated');
          this.setState({editComment: null});
        }

        if(success) {
          React.findDOMNode(this.refs.commentInput).value = '';
        }
      });
    }
  },

  componentWillUpdate() {
    if(this.state.editComment) {
      React.findDOMNode(this.refs.commentInput).value = this.state.editComment.comment;
    }
  },

  render() {
    let {comments, parentId, currentUser, canPin, canEdit} = this.props;
    return (
      <div className="comments">
        {comments.length > 0 ?
          <CSSTransitionGroup transitionName="comment">
            {comments.map((comment, i) => {
              return (
                <SingleComment
                  key={i}
                  comment={comment}
                  id={comment._id}
                  canPin={canPin}
                  edit={this.handleCommentEdit}
                canEdit={canEdit}/>
              );
            })}
          </CSSTransitionGroup>
        : <div className="comments__no-content">Doh, no comments yet</div>}

        <div className="comment comment__new">
          {this.props.currentUser ?
            <span>
              <input
                onKeyUp={this.handleKeyUp}
                ref="commentInput"/>
              <Avatar user={this.props.currentUser} size="small"/>
            </span>
          :
            <button
              className="full-width"
              onClick={this.handleSignIn}>
              Sign in with Google to comment
            </button>
          }
        </div>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    newComment(args) {
      check(args, {
        id: Match.OneOf(String, null),
        comment: String,
        created_at: Number,
        created_by: String,
        parent: String
      });

      return Comments.insert(args);
    },

    editComment(args) {
      check(args, {
        id: Match.OneOf(String, null),
        comment: String,
        created_at: Number,
        created_by: String,
        parent: String
      });

      return Comments.update(args.id, {
        $set: {comment: args.comment}
      })
    }
  });
}
