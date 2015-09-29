ImageUploader = React.createClass({
  propTypes: {
    parentId: React.PropTypes.string.isRequired
  },

  handleImageUpload(files) {
    let file = files[0];
    console.log(file);
    let uploader = new Slingshot.Upload('fileUploads');

    uploader.send(file, (error, url) => {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
      } else {
        Meteor.call('newImage', {
          url: url,
          parent: this.props.parentId,
          created_at: Date.now()
        });
      }
    });
  },

  render() {
    return (
      <div className="image-uploader">
        <Dropzone
          className="image-uploader__dropzone"
          onDrop={this.handleImageUpload}
          multiple={false}
          accept="image/*"/>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    newImage(args) {
      return Images.insert(args);
    }
  });
}
