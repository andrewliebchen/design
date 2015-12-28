CommentsPanel = React.createClass({
  propTypes: {
    description: React.PropTypes.string,
    descriptionMethod: React.PropTypes.string,
    comments: React.PropTypes.array,
    parentId: React.PropTypes.string,
    currentUser: React.PropTypes.object,
    canPin: React.PropTypes.bool,
    canEdit: React.PropTypes.bool
  },

  _scrollToBottom() {
    let scrollContainer = React.findDOMNode(this.refs.scrollContainer);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  },

  componentDidMount() {
    this._scrollToBottom();
  },

  componentDidUpdate() {
    this._scrollToBottom();
  },

  render() {
    let {
      description,
      descriptionMethod,
      comments,
      parentId,
      currentUser,
      canPin,
      canEdit
    } = this.props;
    return (
      <div className="panel__scroll panel__scroll_comments" ref="scrollContainer">
        <div className="project__description panel__content">
          <h3>Description</h3>
          <InlineEdit
            defaultValue={description}
            method={descriptionMethod}
            parentId={parentId}
            type="textarea"
            toast="Description up to date!"
            canEdit={canEdit}/>
        </div>
        <CommentsList
          comments={comments}
          parentId={parentId}
          currentUser={currentUser}
          canPin={canPin}
          canEdit={canEdit}/>
      </div>
    );
  }
});
