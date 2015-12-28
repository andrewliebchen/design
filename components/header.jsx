Header = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    title: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.String
    ]).isRequired,
    hasPanel: React.PropTypes.bool,
    brandLink: React.PropTypes.string
  },

  getMeteorData() {
    return {
      toast: Session.get('toast')
    };
  },

  getDefaultProps() {
    return {
      brandLink: '/'
    };
  },

  render() {
    let {title, hasPanel, brandLink} = this.props;
    let brandClassName = classnames({
      'header__brand': true,
      'has-toast': this.data.toast
    });
    let titleClassName = classnames({
      'header__title': true,
      'has-panel': hasPanel
    })
    return (
      <header className="header">
        <Toast/>
        <a className={brandClassName} href={brandLink}>
          <Brand/>
        </a>
        <h2 className={titleClassName}>{title}</h2>
        {this.props.children}
      </header>
    );
  }
});
