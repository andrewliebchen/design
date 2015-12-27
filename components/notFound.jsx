NotFound = React.createClass({
  render() {
    return (
      <Gatekeeper>
        <h3>Sorry, we messed something up.</h3>
      </Gatekeeper>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.notFound = {
    action() {
      ReactLayout.render(NotFound);
    }
  };
}
