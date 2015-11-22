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
            <PanelNav onClick={open} selected={selected}/>
            <a className="panel__close block" onClick={close}>👉</a>
          </header>
          {this.props.children}
        </aside>
        <div className="panel__background" onClick={close}/>
      </span>
    );
  }
});
