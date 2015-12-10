Pin = React.createClass({
  mixins: [ReactMeteorData, PinHoverMixin],

  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    id: React.PropTypes.string,
    type: React.PropTypes.string
  },

  getMeteorData() {
    return {
      hovered: Session.get('commentHover') === this.props.id
    };
  },

  render() {
    let style = {
      top: `${this.props.y}%`,
      left: `${this.props.x}%`
    };
    let className = classnames({
      'pin': true,
      'is-hovered': this.data.hovered,
      'is-good': this.props.type === 'good',
      'is-bad': this.props.type === 'bad'
    })

    return (
      <div
        className={className}
        style={style}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        {this.props.type === 'good' ? <Icon type="happy" size={1}/> : null}
        {this.props.type === 'bad' ? <Icon type="frown" size={1}/> : null}
      </div>
    );
  }
});
