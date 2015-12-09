Pin = React.createClass({
  mixins: [ReactMeteorData, PinHoverMixin],

  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    id: React.PropTypes.string
  },

  getMeteorData() {
    return {
      hovered: Session.get('commentHover') === this.props.id
    };
  },

  render() {
    let style = {
      top: `${this.props.y}%`,
      left: `${this.props.x}%`
    };
    let className = classnames({
      'pin': true,
      'is-hovered': this.data.hovered
    })

    return (
      <div
        className={className}
        style={style}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}/>
    );
  }
});

Pins = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    parentId: React.PropTypes.string,
    panel: React.PropTypes.string,
    imageSrc: React.PropTypes.string
  },

  getMeteorData() {
    // Assume this subscription is already on the layout...
    let comments = Meteor.subscribe('comments', this.props.parentId);

    return {
      pins: Comments.find({
        parent: this.props.parentId,
        position: {$exists: true}
      }).fetch()
    };
  },

  handleAddPin(event) {
    if(Session.get('pinning')) {
      let $target = $(event.target);
      let commentId = Session.get('pinning');
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
    return (
      <div
        className="pins"
        onClick={this.props.panel ? this.handleAddPin : null}>
        {this.props.panel ? this.data.pins.map((pin, i) => {
          return (
            <Pin
              key={i}
              x={pin.position.x}
              y={pin.position.y}
              id={pin._id}/>
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
            y: args.yPos
          }
        }
      });
    }
  });
}
