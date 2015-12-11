PanelNav = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    contentTypes: React.PropTypes.array,
    selected: React.PropTypes.oneOf(['comments', 'settings', 'account']),
    commentCount: React.PropTypes.number,
    currentUser: React.PropTypes.object
  },

  render() {
    let {onClick, contentTypes, selected, commentCount, currentUser} = this.props;
    return (
      <nav className="panel-nav">
        {contentTypes.map((content, i) => {
          return (
            <a
              key={i}
              className={`panel-nav__item block ${selected === content ? 'is-selected' : ''}`}
              onClick={onClick.bind(null, content)}>
              <Icon type={content}/>
              {content === 'comments' && commentCount > 0 ?
                <strong className="block__badge">{commentCount}</strong>
              : null}
            </a>
          );
        })}
        <Avatar
          user={currentUser}
          className={`panel-nav__item ${selected === 'account' ? 'is-selected' : ''}`}
          size="large"
          imageOnly
          handleClick={onClick.bind(null, 'account')}/>
      </nav>
    );
  }
});
