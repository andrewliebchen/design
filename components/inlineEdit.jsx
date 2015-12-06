InlineEdit = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
    method: React.PropTypes.string,
    parentId: React.PropTypes.string,
    toast: React.PropTypes.string
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
    let input = React.findDOMNode(this.refs.inlineInput).value;
    Meteor.call(this.props.method, {
      id: this.props.parentId,
      name: input
    }, (error, success) => {
      if(success){
        Session.set('toast', this.props.toast);
        this.setState({editing: false});
      }
    });
  },

  render() {
    if(this.state.editing) {
      return (
        <span>
          <input
            type="text"
            defaultValue={this.props.defaultValue}
            autoFocus
            ref="inlineInput"/>
          <a onClick={this.handleSave}>Save</a>
        </span>
      );
    }
    return (
      <span onClick={this.handleEditToggle}>{this.props.defaultValue}</span>
    );
  }
});
