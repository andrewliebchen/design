Pin = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number
  },

  render() {
    let style = {
      top: `${this.props.y}px`,
      left: `${this.props.x}px`
    };

    return <div className="pin" style={style}/>;
  }
});

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
      pins: Comments.find({parent: this.props.parentId, position: {$exists: true}}).fetch()
    };
  },

  handleAddPin(event) {
    if(Session.get('pinning')) {
      let commentId = Session.get('pinning');
      let targetOffset = $(event.target).offset();
      let targetOffsetY = targetOffset.top + document.body.scrollTop;
      let yPos = event.clientY - targetOffsetY;
      let xPos = event.clientX - targetOffset.left;

      Meteor.call('addPin', {
        commentId: commentId,
        xPos: xPos,
        yPos: yPos
      }, (err, success) => {
        if(success) {
          Session.set({
            'pinning': null,
            'toast': null
          });
        }
      });
    }
  },

  render() {
    return (
      <div
        className="pins"
        onClick={this.handleAddPin}>
        {this.data.pins.map((pin, i) => {
          return <Pin key={i} x={pin.position.x} y={pin.position.y}/>
        })}
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    addPin(args) {
      check(args, {
        commentId: String,
        xPos: Number,
        yPos: Number
      });

      return Comments.update(args.commentId, {
        $set: {
          position: {
            x: args.xPos,
            y: args.yPos
          }
        }
      });
    }
  });
}
