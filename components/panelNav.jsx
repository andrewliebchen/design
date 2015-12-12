const _ = lodash;

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
            <Block
              key={i}
              className="panel-nav__item"
              selected={selected === content}
              onClick={onClick.bind(null, content)}
              label={_.capitalize(content)}
              badge={content === 'comments' && commentCount > 0 ? commentCount : null}>
                <Icon type={content}/>
            </Block>
          );
        })}
        <Avatar
          user={currentUser}
          className={`panel-nav__item ${selected === 'account' ? 'is-selected' : ''}`}
          handleClick={onClick.bind(null, 'account')}
          label="Account"
          selected={selected === 'account'}/>
      </nav>
    );
  }
});
