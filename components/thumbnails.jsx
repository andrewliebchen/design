Thumbnails = React.createClass({
  propTypes: {
    images: React.PropTypes.array.isRequired,
    canEdit: React.PropTypes.bool
  },

  getInitialState() {
    return {
      sortTransmitter: false,
      sortReceiver: false
    };
  },

  _resetSort() {
    this.setState({
      sortTransmitter: false,
      sortReceiver: false
    });
  },

  handleDragStart(id, event) {
    event.stopPropagation();
    this.setState({sortTransmitter: id});
  },

  handleDragEnd(id, event) {
    event.stopPropagation();

    if(this.state.sortTransmitter !== this.state.sortReceiver) {
      Meteor.call('sortImages', {
        transmitter: this.state.sortTransmitter,
        receiver: this.state.sortReceiver
      }, (error, success) => {
        Session.set('toast', 'Image order updated');
        this._resetSort();
      });
    } else {
      this._resetSort();
    }
  },

  handleDragOver(id, event) {
    event.stopPropagation();
    this.setState({sortReceiver: id});
  },

  render() {
    let {images, canEdit} = this.props;
    return (
      <div className="thumbnails">
        {images.map((image, i) => {
          return (
            <Thumbnail
              key={i}
              image={image}
              dragStart={this.handleDragStart}
              dragEnd={this.handleDragEnd}
              dragOver={this.handleDragOver}
              dropTarget={this.state.sortReceiver === image._id}
              canEdit={canEdit}/>
          );
        })}
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    sortImages(args) {
      check(args, {
        transmitter: String,
        receiver: String
      });

      let receiverOrder = Images.findOne(args.receiver).order;
      let previous = Images.find({order: {$lt: receiverOrder}}, {sort: {order: 1}, limit:1}).fetch();

      let newOrder = previous.length > 0 ? (receiverOrder + previous[0].order) / 2 : receiverOrder / 2;

      return Images.update(args.transmitter, {
        $set: {order: newOrder}
      });
    }
  });
}
