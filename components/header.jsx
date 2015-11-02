AccountsUIWrapper = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Blaze.Template.loginButtons,
      React.findDOMNode(this.refs.container));
  },

  componentWillUnmount() {
    Blaze.remove(this.view);
  },

  render() {
    return <span className="session__wrapper" ref="container" />;
  }
});

Header = React.createClass({
  render() {
    return (
      <header className="header">
        <a className="header__brand" href="/">Design</a>
        <AccountsUIWrapper/>
      </header>
    );
  }
});
