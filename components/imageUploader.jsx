ImageUploader = React.createClass({
  propTypes: {
    projectId: React.PropTypes.string.isRequired
  },

  handleImageUpload(event) {
    let file = event.target.files[0];
    console.log(file);
    let uploader = new Slingshot.Upload('fileUploads');

    uploader.send(file, (error, url) => {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
      } else {
        Meteor.call('newImage', {
          url: url,
          parent: this.props.projectId,
          created_at: Date.now()
        });
      }
    });
  },

  render() {
    return (
      <div className="image-uploader">
        <input type="file" onChange={this.handleImageUpload}/>
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
