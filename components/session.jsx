const AccountsUIWrapper = React.createClass({
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

const SessionMenu = React.createClass({
  render() {
    return (
      <div className="session__menu">
        <div className="session__menu__item session__account">
          <Avatar user={Meteor.user()}/>
        </div>
        <a className="session__menu__item" href="/">
          <Icon type="home"/>
          <span>Home</span>
        </a>
        <a className="session__menu__item">
          <Icon type="plus"/>
          <span>Account Settings</span>
        </a>
        <a className="session__menu__item">
          <Icon type="plus"/>
          <span>Logout</span>
        </a>
        {/*<AccountsUIWrapper/>*/}
      </div>
    );
  }
});

Session = React.createClass({
  getInitialState() {
    return {
      menu: false
    };
  },

  handleToggleMenu() {
    this.setState({menu: !this.state.menu});
  },

  render() {
    return (
      <div className="session">
        <a className="block brand" onClick={this.handleToggleMenu}>💅</a>
        {this.state.menu ? <SessionMenu/> : null}
      </div>
    );
  }
});
