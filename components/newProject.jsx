NewProject = React.createClass({
  getInitialState() {
    return {
      form: false
    };
  },

  handleToggleForm() {
    this.setState({form: !this.state.form});
  },

  render() {
    return (
      <a className="add-project block brand" onClick={this.handleToggleForm}>
        <Icon type="plus"/>
        {this.state.form ? <ProjectForm/> : null}
      </a>
    );
  }
});
