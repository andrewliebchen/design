Avatar = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    size: React.PropTypes.oneOf(['large', 'small']),
    className: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    imageOnly: React.PropTypes.bool
  },

  render() {
    let {size, className, handleClick, imageOnly} = this.props;
    let user = this.props.user.profile;
    let avatarSrc = user.avatar_src;
    return (
      <div
        className={`avatar ${className ? className : ''} ${size ? size : ''}`}
        onClick={handleClick}>
        {avatarSrc ?
          <div className="avatar__image">
            <img src={avatarSrc}/> 
          </div>
        : null}
        {!imageOnly ?
          <strong className="avatar__body">
            {user.name}
          </strong>
        : null}
      </div>
    );
  }
});
