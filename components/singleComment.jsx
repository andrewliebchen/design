SingleComment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired,
    canPin: React.PropTypes.bool
  },

  handleAddPin() {
    Session.set('pinning', this.props.comment._id);
  },

  render() {
    return (
      <div className="comment">
        <img className="comment__avatar avatar__image" src={Meteor.user().profile.avatar_src}/>
        <div className="comment__body">
          <h4>Andrew Liebchen</h4>
          {this.props.canPin ?
            this.props.comment.position ? <Pin/> : <a onClick={this.handleAddPin}>Pin this comment</a>
          : null}

          <p>{this.props.comment.comment}</p>
          <footer className="comment__footer">
            <small>{moment(this.props.comment.created_at).fromNow()}</small>
          </footer>
        </div>
      </div>
    );
  }
});
