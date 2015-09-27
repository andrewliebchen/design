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
        {this.state.form ?
          <ProjectForm/>
        : <button onClick={this.handleToggleForm}>Add project</button>}
      </div>
    );
  }
});
