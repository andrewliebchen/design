PanelNav = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    contentTypes: React.PropTypes.array,
    selected: React.PropTypes.oneOf(['comments', 'settings', 'account']),
    commentCount: React.PropTypes.number
  },

  render() {
    let {onClick, contentTypes, selected, commentCount} = this.props;
    return (
      <nav className="panel-nav">
        {contentTypes.map((content, i) => {
          return (
            <a
              key={i}
              className={`panel-nav__item block ${selected === content ? 'is-selected' : ''}`}
              onClick={onClick.bind(null, content)}>
              <Icon type={content}/>
              {content === 'comments' ?
                <strong className="block__badge">{commentCount}</strong>
              : null}
            </a>
          );
        })}
        <Avatar
          user={Meteor.user()}
          className={`panel-nav__item ${selected === 'account' ? 'is-selected' : ''}`}
          size="large"
          imageOnly
          handleClick={onClick.bind(null, 'account')}/>
      </nav>
    );
  }
});
