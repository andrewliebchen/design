App = React.createClass({
  render() {
    return (
      <div>Howdy, world!</div>
    );
  }
});

if(Meteor.isClient) {
  ReactLayout.render(App);
}
