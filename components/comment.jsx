const CSSTransitionGroup = React.addons.CSSTransitionGroup;

SingleComment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired,
    canPin: React.PropTypes.bool
  },

  getInitialState() {
    return {
      dropdown: false
    };
  },

  handleAddPin() {
    Session.set({
      'pinning': this.props.comment._id,
      'toast': 'Click on the image to place your pin...'
    });
  },

  handleDropdownToggle() {
    this.setState({dropdown: !this.state.dropdown});
  },

  pageClick() {
    if(!this.clickOnDropdown) {
      this.setState({dropdown: false});
    }
  },

  handleMouseDown() {
    this.clickOnDropdown = true;
  },

  handleMouseUp() {
    this.clickOnDropdown = false;
  },

  handleCommentEdit() {
    console.log('Edit comment');
    this.setState({dropdown: false});
  },

  handleCommentDelete() {
    Meteor.call('deleteComment', this.props.comment._id, (err, success) => {
      if(success) {
        Session.set('toast', 'Poof! comment deleted.');
      }
    });
  },

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick, false);
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
            <div className="comment__header__meta">
              <small>{moment(comment.created_at).fromNow()}</small>
              <Icon
                type="settings"
                size={1.25}
                onClick={this.handleDropdownToggle}
                className="comment__settings__toggle"/>
            </div>
          </header>
          <div className="comment__content">{comment.comment}</div>
          <footer className="comment__footer">
            {canPin ?
              comment.position ?
                <Pin/>
              :
                <a onClick={this.handleAddPin}>Pin this comment</a>
            : null}
          </footer>
        </div>
        <CSSTransitionGroup transitionName="menu">
          {this.state.dropdown ?
            <div
              key={1}
              className="menu comment__settings__menu"
              onMouseDown={this.handleMouseDown}
              omMouseUp={this.handleMouseUp}>
              <div className="menu__item" onClick={this.handleCommentEdit}>
                <Icon type="edit" size={1.5}/>Edit</div>
              <div className="menu__item" onClick={this.handleCommentDelete}>
                <Icon type="trash" size={1.5}/>Delete
              </div>
            </div>
          : null}
        </CSSTransitionGroup>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteComment(id) {
      check(id, String);
      return Comments.remove(id);
    }
  });
}
