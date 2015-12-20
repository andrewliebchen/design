Header = React.createClass({
  propTypes: {
    title: React.PropTypes.object.isRequired,
    parentTitle: React.PropTypes.string,
    parentLink: React.PropTypes.string,
    hasPanel: React.PropTypes.bool
  },

  render() {
    let {title, parentTitle, parentLink, hasPanel} = this.props;
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
        {parentTitle ?
          <div className={titleClassName}>
            <a className="header__subtitle" href={parentLink}>
              <Icon type="home" size={1}/>{parentTitle}
            </a>
            <h2>{title}</h2>
          </div>
        :
          <h2 className={titleClassName}>{title}</h2>}
        {this.props.children}
      </header>
    );
  }
});
