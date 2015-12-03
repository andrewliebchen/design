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
        created_by: Meteor.user()._id,
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
        <input onKeyUp={this.handleKeyUp}/>
        <Avatar user={Meteor.user()} imageOnly/>
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
        created_by: String,
        parent: String
      });

      return Comments.insert(args);
    }
  });
}
