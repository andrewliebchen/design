Header = React.createClass({
  propTypes: {
    title: React.PropTypes.object.isRequired,
    parentTitle: React.PropTypes.string,
    parentLink: React.PropTypes.string
  },

  render() {
    let {title, parentTitle, parentLink} = this.props;
    return (
      <header className="header">
        <a className="header__brand header__left" href="/">
          <Brand/>
        </a>
        {parentTitle ?
          <div className="header__title">
            <a className="header__subtitle" href={parentLink}>{parentTitle}</a>
            <h2>{title}</h2>
          </div>
        :
          <h2 className="header__title">{title}</h2> }
        {this.props.children}
      </header>
    );
  }
});
