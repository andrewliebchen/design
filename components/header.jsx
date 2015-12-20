Header = React.createClass({
  propTypes: {
    title: React.PropTypes.object.isRequired,
    hasPanel: React.PropTypes.bool
  },

  render() {
    let {title, hasPanel} = this.props;
    let titleClassName = classnames({
      'header__title': true,
      'has-panel': hasPanel
    })
    return (
      <header className="header">
        <Toast/>
        <a className="header__brand header__left" href="/">
          <Brand/>
        </a>
        <h2 className={titleClassName}>{title}</h2>
        {this.props.children}
      </header>
    );
  }
});
