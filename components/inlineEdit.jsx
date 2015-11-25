// SOURCE: https://github.com/lovasoa/react-contenteditable

InlineEdit = React.createClass({
  propTypes: {
    html: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  render(){
    return(
      <span
        className="inline-edit"
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        autoFocus
        dangerouslySetInnerHTML={{__html: this.props.html}}/>
    );
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
