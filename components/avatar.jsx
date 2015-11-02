Avatar = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  render() {
    let user = this.props.user.profile;
    let avatarSrc = user.avatar_src;
    return (
      <div className="avatar">
        {avatarSrc ? <img src={avatarSrc} className="avatar__image"/> : null}
        <strong className="avatar__body">
          {user.name}
        </strong>
      </div>
    );
  }
});
