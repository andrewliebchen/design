Header = React.createClass({

  render() {
    return (
      <header className="header project__header">
        <a className="block brand" href="/">D</a>
        {this.props.children}
        <Avatar user={Meteor.user()} size="large" imageOnly/>
      </header>
    );
  }
});
