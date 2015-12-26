PinHoverMixin = {
  handleMouseOver() {
    Session.set('commentHover', this.props.id);
  },

  handleMouseOut() {
    Session.set('commentHover', null);
  },
}
