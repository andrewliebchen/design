Avatar = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    size: React.PropTypes.oneOf(['large', 'small']),
    imageOnly: React.PropTypes.bool
  },

  render() {
    let user = this.props.user.profile;
    let avatarSrc = user.avatar_src;
    return (
      <div className={`avatar ${this.props.size}`}>
        {avatarSrc ? <img src={avatarSrc} className="avatar__image"/> : null}
        {!this.props.imageOnly ?
          <strong className="avatar__body">
            {user.name}
          </strong>
        : null}
      </div>
    );
  }
});
