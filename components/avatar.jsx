Avatar = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    size: React.PropTypes.oneOf(['large', 'small']),
    className: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    imageOnly: React.PropTypes.bool
  },

  render() {
    let {size, className, handleClick, imageOnly, user} = this.props;
    let avatarSrc = user ? user.profile.avatar_src : null;
    return (
      <div
        className={`avatar ${className ? className : ''} ${size ? size : ''}`}
        onClick={handleClick}>
        <div className="avatar__image">
          {avatarSrc ?
            <img src={avatarSrc}/>
          : <Icon type="person" className="block action"/>}
        </div>
        {!imageOnly ?
          <strong className="avatar__body">
            {user.profile.name}
          </strong>
        : null}
      </div>
    );
  }
});
