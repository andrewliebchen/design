Header = React.createClass({
  propTypes: {
    title: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <header className="header">
        <h2 className="header__title">{this.props.title}</h2>
        {this.props.children}
      </header>
    );
  }
});
