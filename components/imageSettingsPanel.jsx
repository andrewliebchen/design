ImageSettingsPanel = React.createClass({
  propTypes: {
    imageId: React.PropTypes.string,
    parentId: React.PropTypes.string,
    canEdit: React.PropTypes.bool
  },

  handleImageDelete(event) {
    event.stopPropagation();
    if (window.confirm('Do you really want to delete this image?')) {
      Meteor.call('deleteImage', this.props.imageId, (error, success) => {
        FlowRouter.go(`/${this.props.parentId}`);
        Session.set('toast', 'Poof! Image deleted')
      });
    }
  },

  render() {

    return (
      <div className="panel__scroll">
        <div className="panel__content">
          {this.props.canEdit ?
            <div className="form-group">
              <h3>Danger zone!</h3>
              <p>Careful, this action can't be undone.</p>
              <button className="full-width negative" onClick={this.handleImageDelete}>
                <Icon type="trash" size={1.5}/> Delete this image
              </button>
            </div>
          : null}
        </div>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    deleteImage(id) {
      check(id, String);
      return Images.remove(id);
    }
  });
}
