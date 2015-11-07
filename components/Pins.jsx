Pins = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    parentId: React.PropTypes.string,
  },

  getMeteorData() {
    // Assume this subscription is already on the layout...
    let comments = Meteor.subscribe('comments', this.props.parentId);

    return {
      loading: !comments.ready(),
      pins: Comments.find({parent: this.props.parentId, pin: {$exists: true}}).fetch()
    };
  },

  render() {
    console.log(this.data.pins)
    return (
      <div className="pins">
        {this.data.pins.map((pin, i) => {
          let style = {
            top: `${pin.y}%`,
            left: `${pin.x}%`
          };

          return <div className="pin" key={i} style={style}/>;
        })}
      </div>
    );
  }
});
