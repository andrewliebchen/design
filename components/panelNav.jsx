PanelNav = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    contentTypes: React.PropTypes.array,
    selected: React.PropTypes.oneOf(['comments', 'settings', 'account'])
  },

  render() {
    let {onClick, contentTypes, selected} = this.props;
    return (
      <nav className="panel-nav">
        {contentTypes.map((content, i) => {
          return (
            <a
              key={i}
              className={`panel-nav__item block ${selected === content ? 'is-selected' : ''}`}
              onClick={onClick.bind(null, content)}>
              <Icon type={content}/>
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
