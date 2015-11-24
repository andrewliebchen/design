const _ = lodash;

Loading = React.createClass({
  render() {
    return (
      <div className="loading">
        {_.times(4, (i) => {
          return <div key={i} className={`loading-element loading-element__${i}`}/>;
        })}
      </div>
    );
  }
})
