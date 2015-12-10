SingleComment = React.createClass({
  mixins: [ReactMeteorData, PinHoverMixin],

  propTypes: {
    comment: React.PropTypes.object.isRequired,
    canPin: React.PropTypes.bool,
    id: React.PropTypes.string
  },

  getMeteorData() {
    return {
      hovered: Session.get('commentHover') === this.props.id
    };
  },

  handleAddPin() {
    Session.set({
      'pinning': this.props.id,
      'toast': 'Click on the image to place your pin...'
    });
  },

  handleCommentEdit() {
    console.log('Edit comment');
    this.setState({dropdown: false});
  },

  handleCommentDelete() {
    Meteor.call('deleteComment', this.props.id, (err, success) => {
      if(success) {
        Session.set('toast', 'Poof! comment deleted.');
      }
    });
  },

  render() {
    let {comment, canPin} = this.props;
    let commenter = Meteor.users.findOne(this.props.comment.created_by);
    return (
      <div
        className={`comment ${this.data.hovered ? 'is-hovered' : ''}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        <Avatar user={commenter} imageOnly/>
        <div className="comment__body">
          <header className="comment__header">
            <h4 className="comment__name">{commenter.profile.name}</h4>
            <div className="comment__meta">
              <small className="comment__meta__item">
                {moment(comment.created_at).fromNow()}
              </small>
              <Dropdown
                toggle={<a className="block tiny"><Icon type="settings" size={1}/></a>}
                className="comment__meta__item">
                <span>
                  <div className="menu__item" onClick={this.handleCommentEdit}>
                    <Icon type="edit" size={1.5}/>Edit</div>
                  <div className="menu__item" onClick={this.handleCommentDelete}>
                    <Icon type="trash" size={1.5}/>Delete
                  </div>
                </span>
              </Dropdown>
              {canPin ?
                <a
                  className={`block tiny comment__meta__item ${comment.position ? 'is-selected' : ''}`}
                  onClick={comment.position ? null : this.handleAddPin}>
                  <Icon type="pin" size={1}/>
                </a>
              : null}
            </div>
          </header>
          <div className="comment__content">
            {comment.comment}
          </div>
        </div>
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
