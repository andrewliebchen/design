NewComment = React.createClass({
  mixins: [AccountActionsMixin],

  propTypes: {
    parentId: React.PropTypes.string.isRequired,
    pin: React.PropTypes.bool,
    currentUser: React.PropTypes.object
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
        {this.props.currentUser ?
          <span>
            <input onKeyUp={this.handleKeyUp}/>
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
