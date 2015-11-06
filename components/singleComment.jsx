SingleComment = React.createClass({
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
});
