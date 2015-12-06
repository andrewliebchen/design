InlineEdit = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
    method: React.PropTypes.string,
    parentId: React.PropTypes.string,
    toast: React.PropTypes.string,
    type: React.PropTypes.oneOf(['input', 'textarea'])
  },

  getDefaultProps() {
    return {
      type: 'input'
    };
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  handleSave() {
    let inputValue = React.findDOMNode(this.refs.inlineInput).value;
    if(inputValue !== this.props.defaultValue) {
      Meteor.call(this.props.method, {
        id: this.props.parentId,
        value: inputValue
      }, (error, success) => {
        if(success){
          Session.set('toast', this.props.toast);
          this.setState({editing: false});
        }
      });
    }
  },

  render() {
    let {defaultValue, type} = this.props;
    if(this.state.editing) {
      return (
        <span>
          {type === 'input' ?
            <input
              type="text"
              ref="inlineInput"
              defaultValue={defaultValue}
              autoFocus/>
          : null}
          {type === 'textarea' ?
            <textarea
              ref="inlineInput"
              defaultValue={defaultValue}
              autoFocus/>
          : null}
          <a onClick={this.handleEditToggle}>
            <Icon type="close" size={1}/>
          </a>
          <a onClick={this.handleSave}>Save</a>
        </span>
      );
    }
    return (
      <span onClick={this.handleEditToggle}>{defaultValue}</span>
    );
  }
});
