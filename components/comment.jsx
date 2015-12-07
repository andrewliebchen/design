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
    Session.set('pinning', this.props.comment._id);
  },

  handleDropdownToggle() {
    this.setState({dropdown: !this.state.dropdown});
  },

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick, false);
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
        {this.state.dropdown ?
          <div
            className="menu comment__settings__menu"
            onMouseDown={this.handleMouseDown}
            omMouseUp={this.handleMouseUp}>
            <div className="menu__item">Edit</div>
            <div className="menu__item">Delete</div>
          </div>
        : null}
      </div>
    );
  }
});
