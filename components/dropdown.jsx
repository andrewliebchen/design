const CSSTransitionGroup = React.addons.CSSTransitionGroup;

Dropdown = React.createClass({
  propTypes: {
    toggle: React.PropTypes.object,
    className: React.PropTypes.string
  },

  getInitialState() {
    return {
      menu: false
    };
  },

  handleMouseDown() {
    this.clickOnDropdown = true;
  },

  handleMouseUp() {
    this.clickOnDropdown = false;
  },

  pageClick() {
    if(!this.clickOnDropdown) {
      this.setState({menu: false});
    }
  },

  handleDropdownToggle() {
    this.setState({menu: !this.state.menu});
  },

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick, false);
  },

  render() {
    let dropdownClassName = classnames({
      'dropdown': true,
      'show-menu': this.state.menu
    });
    return (
      <div className={`${dropdownClassName} ${this.props.className}`}>
        <span onClick={this.handleDropdownToggle}>{this.props.toggle}</span>
        <CSSTransitionGroup transitionName="menu">
          {this.state.menu ?
            <div
              className="menu"
              onMouseDown={this.handleMouseDown}
              omMouseUp={this.handleMouseUp}>
              {this.props.children}
            </div>
          : null}
        </CSSTransitionGroup>
      </div>
    );
  }
});
