const CSSTransitionGroup = React.addons.CSSTransitionGroup;

Toast = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      toast: Session.get('toast')
    };
  },

  componentDidUpdate() {
    if(this.data.toast) {
      setTimeout(() => {
        Session.set('toast', false);
      }, 5000);
    }
  },

  render() {
    return (
      <CSSTransitionGroup transitionName="toast">
        {this.data.toast ?
          <div className="toast">{this.data.toast}</div>
        : null}
      </CSSTransitionGroup>
    );
  }
});

if(Meteor.isClient) {
  Session.setDefault('toast', false);
}
