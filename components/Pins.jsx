Pins = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    parentId: React.PropTypes.string,
    panel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    imageSrc: React.PropTypes.string
  },

  getMeteorData() {
    // Assume this subscription is already on the layout...
    let comments = Meteor.subscribe('comments', this.props.parentId);

    return {
      pins: Comments.find({
        parent: this.props.parentId,
        position: {$exists: true}
      }).fetch(),
      pinning: Session.get('pinning')
    };
  },

  handleAddPin(event) {
    if(this.data.pinning) {
      let $target = $(event.target);
      let commentId = this.data.pinning;
      let targetOffset = $target.offset();

      let targetMarginLeft = parseInt($target.css('margin-left'), 10);
      let targetMarginTop = parseInt($target.css('margin-top'), 10);

      let xPos = event.clientX - targetOffset.left + targetMarginLeft;
      let yPos = event.clientY - targetOffset.top + targetMarginTop;

      let xPosPercent = xPos / ($target.width()  + targetMarginLeft * 2) * 100;
      let yPosPercent = yPos / ($target.height() + targetMarginTop * 2) * 100;

      Meteor.call('addPin', {
        commentId: commentId,
        xPos: xPosPercent,
        yPos: yPosPercent
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
    let pinsClassName = classnames({
      'pins': true,
      'is-pinning': this.data.pinning
    });
    return (
      <div
        className={pinsClassName}
        onClick={this.props.panel ? this.handleAddPin : null}>
        {this.props.panel ? this.data.pins.map((pin, i) => {
          return (
            <Pin
              key={i}
              x={pin.position.x}
              y={pin.position.y}
              id={pin._id}
              type={pin.position.type}/>
          );
        }) : null}
        <img className="image__img" src={this.props.imageSrc}/>
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
            y: args.yPos,
            type: 'pin'
          }
        }
      });
    }
  });
}
