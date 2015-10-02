Panel = React.createClass({
  render() {
    return (
      <aside className="panel">
        <header className="panel__header">
          <h2>{this.props.title}</h2>
          <a onClick={this.props.onClose}>X</a>
        </header>
        {this.props.children}
      </aside>
    );
  }
});
