// SOURCE: https://github.com/lovasoa/react-contenteditable

InlineEdit = React.createClass({
  propTypes: {
    html: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  handleToggleEdit() {
    this.setState({editing: !this.state.editing});
  },

  render(){
    if(this.state.editing) {
      return(
        <span
          className="content-editable"
          onInput={this.emitChange}
          onBlur={this.emitChange}
          contentEditable={this.state.editing}
          autoFocus
          dangerouslySetInnerHTML={{__html: this.props.html}}/>
      )
    }

    return <span>{this.props.html} <a onClick={this.handleToggleEdit}>edit</a></span>;
  },

  shouldComponentUpdate(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },

  componentDidUpdate() {
    if ( this.props.html !== this.getDOMNode().innerHTML ) {
      this.getDOMNode().innerHTML = this.props.html;
    }
  },

  emitChange(event){
    let html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      event.target = { value: html };
      this.props.onChange(event);
    }
    this.lastHtml = html;
  }
});
