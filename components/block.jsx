Block = React.createClass({
  mixins: [HoverMixin],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['tiny', 'small', 'medium']),
    badge: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      size: 'medium'
    };
  },

  render() {
    let {className, label, onClick, badge, selected, size} = this.props;
    let blockClassName = classnames({
      'block': true,
      'is-selected': selected,
      'tiny': size === 'tiny',
      'small': size === 'small',
      'medium': size === 'medium'
    });

    return (
      <div
        className={`${blockClassName} ${className ? className : ''}`}
        onClick={onClick}
        onMouseEnter={this.hoverable_onMouseEnter}
        onMouseLeave={this.hoverable_onMouseLeave}>
        {(this.state.hover && label) || (selected && label) ?
          <span className="tooltip__label">{label}</span>
        : this.props.children}
        {badge ? <strong className="block__badge">{badge}</strong> : null}
      </div>
    );
  }
});
