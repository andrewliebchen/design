NewComment = React.createClass({
  propTypes: {
    parentId: React.PropTypes.string.isRequired,
    pin: React.PropTypes.bool
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
