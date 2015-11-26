Layout = React.createClass({
  propTypes: {
    content: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="wrapper">
        {Meteor.user() ? this.props.content : <AccountsUIWrapper/>}
      </div>
    );
  }
});
