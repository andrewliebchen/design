ProjectChildren = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    parentId: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let projectChildren = Meteor.subscribe('projectChildren', this.props.parentId);

    return {
      loading: !projectChildren.ready(),
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
        <section>
          <Thumbnails images={this.data.images}/>
        </section>
        <section>
          <CommentsList comments={this.data.comments} parentId={parentId}/>
        </section>
      </Tabs>
    );
  }
});
