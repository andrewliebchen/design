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
      editing: false,
      text: this.props.defaultValue
    };
  },

  handleEditToggle() {
    this.setState({editing: !this.state.editing});
  },

  handleOnChange(event) {
    this.setState({text: event.target.value});
  },

  handleSave(event) {
    if(event.which === 13) {
      Meteor.call(this.props.method, {
        id: this.props.parentId,
        value: this.state.text
      }, (error, success) => {
        if(success){
          Session.set('toast', this.props.toast);
          this.setState({
            editing: false,
            text: ''
          });
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
              defaultValue={this.state.text}
              onChange={this.handleOnChange}
              onBlur={this.handleEditToggle}
              onKeyPress={this.handleSave}
              autoFocus/>
          : null}
          {type === 'textarea' ?
            <textarea
              ref="inlineInput"
              defaultValue={this.state.text}
              onChange={this.handleOnChange}
              onKeyPress={this.handleSave}
              onBlur={this.handleEditToggle}
              autoFocus/>
          : null}
        </span>
      );
    }
    return (
      <span onClick={this.handleEditToggle}>
        {defaultValue ? defaultValue : 'Click to add'}
      </span>
    );
  }
});
