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
          src: url,
          parent: this.props.parentId,
          created_at: Date.now()
        });
      }
    });
  },

  render() {
    return (
      <Dropzone
        className="image-uploader"
        activeClassName="is-active"
        onDrop={this.handleImageUpload}
        multiple={false}
        accept="image/*"/>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    newImage(args) {
      check(args, {
        src: String,
        parent: String,
        created_at: Number
      });
      
      return Images.insert(args);
    }
  });
}
