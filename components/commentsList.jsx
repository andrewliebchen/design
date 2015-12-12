const CSSTransitionGroup = React.addons.CSSTransitionGroup;

CommentsList = React.createClass({
  propTypes: {
    comments: React.PropTypes.array.isRequired,
    parentId: React.PropTypes.string.isRequired,
    currentUser: React.PropTypes.object,
    canPin: React.PropTypes.bool,
    canEdit: React.PropTypes.bool
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
                canEdit={canEdit}/>
              );
            })}
          </CSSTransitionGroup>
        : <div className="comments__no-content">Doh, no comments yet</div>}
        <NewComment parentId={parentId} currentUser={currentUser}/>
      </div>
    );
  }
});
