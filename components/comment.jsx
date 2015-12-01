SingleComment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired,
    canPin: React.PropTypes.bool
  },

  handleAddPin() {
    Session.set('pinning', this.props.comment._id);
  },

  render() {
    let {comment, canPin} = this.props;
    let commenter = Meteor.users.findOne(this.props.comment.created_by);
    return (
      <div className="comment">
        <Avatar user={commenter} imageOnly/>
        <div className="comment__body">
          <header className="comment__header">
            <h4>{commenter.profile.name}</h4>
            <small>{moment(comment.created_at).fromNow()}</small>
          </header>
          <p>{comment.comment}</p>
          <footer className="comment__footer">
            {canPin ?
              comment.position ?
                <Pin/>
              :
                <a onClick={this.handleAddPin}>Pin this comment</a>
            : null}
          </footer>
        </div>
      </div>
    );
  }
});
