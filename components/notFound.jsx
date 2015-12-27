NotFound = React.createClass({
  render() {
    return (
      <div className="four-oh-four">
        <a href="/create"><Brand size="5"/></a>
        <h3>Sorry, we messed something up.</h3>
      </div>
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
