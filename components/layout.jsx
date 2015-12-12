Container = React.createClass({
  propsType: {
    hasPanel: React.PropTypes.bool
  },

  render() {
    let containerClassName = classnames({
      "container": true,
      "has-panel": this.props.hasPanel
    });
    return (
      <section className={containerClassName}>
        {this.props.children}
      </section>
    );
  }
});

Main = React.createClass({
  render() {
    let {className} = this.props;
    return (
      <div className={`main ${className ? className : ''}`}>
        {this.props.children}
      </div>
    );
  }
});

Panel = React.createClass({
  propTypes: {
    open: React.PropTypes.func,
    close: React.PropTypes.func,
    selected: React.PropTypes.string
  },

  render() {
    let {open, close, selected} = this.props;
    return (
      <span className="panel">
        <aside className="panel__container">
          <header className="panel__header">
            {this.props.nav}
            <Block className="panel__close" onClick={close}>
              <Icon type="close"/>
            </Block>
          </header>
          {this.props.children}
        </aside>
      </span>
    );
  }
});
