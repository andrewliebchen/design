const _ = lodash;
const contentTypes = ['comments', 'settings'];
const contentLabels = [<Icon type="comments"/>, <Icon type="settings"/>]

PanelNav = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    selected: React.PropTypes.oneOf(contentTypes)
  },

  render() {
    let {onClick, selected} = this.props;
    return (
      <nav className="panel-nav">
        {contentTypes.map((content, i) => {
          return (
            <a
              key={i}
              className={`panel-nav__item block ${selected === content ? 'is-selected' : ''}`}
              onClick={onClick.bind(null, content)}>
              {contentLabels[i]}
            </a>
          );
        })}
      </nav>
    );
  }
});
