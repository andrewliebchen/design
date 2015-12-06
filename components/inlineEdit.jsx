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

  handleSave(event) {
    let inputValue = event.target.value;
    if(inputValue !== this.props.defaultValue && event.which === 13) {
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
        <span className="inline-edit">
          {type === 'input' ?
            <input
              type="text"
              ref="inlineInput"
              defaultValue={defaultValue}
              onBlur={this.handleEditToggle}
              onKeyPress={this.handleSave}
              autoFocus/>
          : null}
          {type === 'textarea' ?
            <textarea
              ref="inlineInput"
              defaultValue={defaultValue}
              onKeyPress={this.handleSave}
              autoFocus/>
          : null}
        </span>
      );
    }
    return (
      <span onClick={this.handleEditToggle}>{defaultValue}</span>
    );
  }
});
