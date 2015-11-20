ProjectContent = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    parentId: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let projectContent = Meteor.subscribe('projectContent', this.props.parentId);

    return {
      loading: !projectContent.ready(),
      images: Images.find({parent: this.props.parentId}, {sort: {created_at: 1}}).fetch(),
      comments: Comments.find({parent: this.props.parentId}, {sort: {created_at: 1}}).fetch()
    }
  },

  render() {
    let {parentId} = this.props;
    return (
      <Tabs
        defaultTabNum={0}
        tabNames={[
          `Images ${this.data.images.length}`,
          `Comments ${this.data.comments.length}`
        ]}>
        <section className="project__content-pane slice">
          <Thumbnails images={this.data.images}/>
        </section>
        <section className="project__content-pane slice">
          <div className="container">
            <CommentsList comments={this.data.comments} parentId={parentId}/>
          </div>
        </section>
      </Tabs>
    );
  }
});
