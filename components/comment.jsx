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
          <h4>{commenter.profile.name}</h4>
          {canPin ?
            comment.position ? <Pin/> : <a onClick={this.handleAddPin}>Pin this comment</a>
          : null}
          <p>{comment.comment}</p>
          <footer className="comment__footer">
            <small>{moment(comment.created_at).fromNow()}</small>
          </footer>
        </div>
      </div>
    );
  }
});
