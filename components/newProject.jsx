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
      <div className="new-project">
        <a className="block brand" onClick={this.handleToggleForm}>
          <Icon type="plus"/>
        </a>
        {this.state.form ? <ProjectForm/> : null}
      </div>
    );
  }
});
