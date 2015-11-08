CommentsList = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    parentId: React.PropTypes.string,
    canPin: React.PropTypes.bool
  },

  getMeteorData() {
    let comments = Meteor.subscribe('comments', this.props.parentId);

    return {
      loading: !comments.ready(),
      comments: Comments.find({parent: this.props.parentId}, {sort: {created_at: 1}}).fetch()
    };
  },

  render() {
    let {parentId} = this.props;

    if (this.data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div className="comments">
        {this.data.comments ? this.data.comments.map((comment, i) => {
          return <SingleComment key={i} comment={comment} canPin={this.props.canPin}/>;
        }) : <span>No comments</span>}
        <NewComment parentId={this.props.parentId}/>
      </div>
    );
  }
});
