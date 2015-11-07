SingleComment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired,
    addPin: React.PropTypes.func
  },

  render() {
    return (
      <div className="comment">
        <img className="comment__avatar avatar__image" src={Meteor.user().profile.avatar_src}/>
        <div className="comment__body">
          <h4>Andrew Liebchen</h4>
          {this.props.addPin ? <a onClick={this.props.addPin}>Pin this comment</a> : null}
          {this.props.comment.pin ? <div className="pin"/> : null}
          <p>{this.props.comment.comment}</p>
          <footer className="comment__footer">
            <small>{moment(this.props.comment.created_at).fromNow()}</small>
          </footer>
        </div>
      </div>
    );
  }
});
