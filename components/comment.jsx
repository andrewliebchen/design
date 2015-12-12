SingleComment = React.createClass({
  mixins: [ReactMeteorData, PinHoverMixin],

  propTypes: {
    comment: React.PropTypes.object.isRequired,
    canPin: React.PropTypes.bool,
    id: React.PropTypes.string
  },

  getMeteorData() {
    let commenter = Meteor.subscribe('user', this.props.comment.created_by);
    return {
      loading: !commenter.ready(),
      hovered: Session.get('commentHover') === this.props.id,
      commenter: Meteor.users.findOne()
    };
  },

  handleAddPin() {
    Session.set({
      'pinning': this.props.id,
      'toast': 'Click on the image to place your pin...'
    });
  },

  handleCommentEdit() {
    console.log('Edit comment');
  },

  handleCommentDelete() {
    Meteor.call('deleteComment', this.props.id, (err, success) => {
      if(success) {
        Session.set('toast', 'Poof! comment deleted.');
      }
    });
  },

  handlePinType() {
    let newPinType;
    switch(this.props.comment.position.type) {
      case 'good':
        newPinType = 'bad';
        break;
      case 'bad':
        newPinType = 'pin';
        break;
      case 'pin':
        newPinType = 'good';
        break;
    }

    Meteor.call('togglePinType', {
      id: this.props.comment._id,
      type: newPinType
    }, (err, success) => {
      if(success) {
        Session.set('toast', 'Pin updated ;)')
      }
    });
  },

  handlePinDelete() {
    Meteor.call('deletePin', this.props.comment._id, (err, success) => {
      if(success) {
        Session.set('toast', '...and that pin is outta here!');
      }
    });
  },

  render() {
    let {comment, canPin} = this.props;
    let {loading, commenter} = this.data;
    let pinClassName = classnames({
      'is-good': comment.position && comment.position.type === 'good',
      'is-bad': comment.position && comment.position.type === 'bad'
    });
    let pinType = comment.position ? classnames({
      'pin': comment.position.type === 'pin',
      'happy': comment.position.type === 'good',
      'frown': comment.position.type === 'bad'
    }) : null;

    if(loading) {
      return <Loading/>;
    }

    return (
      <div
        className={`comment ${this.data.hovered ? 'is-hovered' : ''}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        <Avatar user={commenter} size="small"/>
        <div className="comment__body">
          <header className="comment__header">
            <h4 className="comment__name">{commenter.profile.name}</h4>
            <div className="comment__meta">
              <small className="comment__meta__item">
                {moment(comment.created_at).fromNow()}
              </small>
              <Dropdown
                toggle={<Block size="tiny"><Icon type="settings" size={1}/></Block>}
                className="comment__meta__item">
                <span>
                  <div className="menu__item" onClick={this.handleCommentEdit}>
                    <Icon type="edit" size={1.5}/>Edit</div>
                  <div className="menu__item" onClick={this.handleCommentDelete}>
                    <Icon type="trash" size={1.5}/>Delete
                  </div>
                </span>
              </Dropdown>
              {canPin ?
                comment.position ?
                  <Dropdown
                    toggle={<Block className={pinClassName} size="tiny" selected><Icon type={pinType} size={1}/></Block>}
                    className="comment__meta__item">
                    <span>
                      <div className="menu__item" onClick={this.handlePinType}>
                        <Icon type={pinType} size={1.5}/>Toggle pin type</div>
                      <div className="menu__item" onClick={this.handlePinDelete}>
                        <Icon type="trash" size={1.5}/>Remove pin
                      </div>
                    </span>
                  </Dropdown>
                :
                  <Block
                    className="comment__meta__item"
                    onClick={this.handleAddPin}
                    size="tiny">
                    <Icon type="pin" size={1}/>
                  </Block>
              : null}
            </div>
          </header>
          <div className="comment__content">
            {comment.comment}
          </div>
        </div>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteComment(id) {
      check(id, String);
      return Comments.remove(id);
    },

    togglePinType(args) {
      check(args, {
        id: String,
        type: String
      });

      return Comments.update(args.id, {
        $set: {'position.type': args.type}
      });
    },

    deletePin(id) {
      check(id, String);
      return Comments.update(id, {
        $unset: {position: ''}
      });
    }
  });
}
