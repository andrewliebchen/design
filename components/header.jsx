AccountsUIWrapper = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Blaze.Template.loginButtons,
      React.findDOMNode(this.refs.container));
  },

  componentWillUnmount() {
    Blaze.remove(this.view);
  },

  render() {
    return <span ref="container" />;
  }
});

Header = React.createClass({
  getInitialState() {
    return {
      menu: false
    };
  },

  handleMenuToggle() {
    this.setState({menu: !this.state.menu});
  },

  handleSignOut() {
    Meteor.logout();
    this.handleMenuToggle();
  },

  render() {
    return (
      <header className="header">
        <a className="header__brand" href="/">Design</a>
        <AccountsUIWrapper/>
      </header>
    );
  }
});
