Brand = React.createClass({
  getDefaultProps() {
    return {
      size: 2.5
    };
  },

  render() {
    return (
      <svg width={`${this.props.size}em`} viewBox="0 0 66.8 92" className="logo">
      	<path d="M32.1,16.3c0,10.3-6,16.3-16,16.3C6.1,32.5,0,26.6,0,16.3C0,5.9,6.1,0,16.1,0C26.1,0,32.1,5.9,32.1,16.3z M11.4,16.3
      		c0,5.5,1.4,7.9,4.7,7.9c3.3,0,4.6-2.4,4.6-7.9c0-5.5-1.4-7.9-4.6-7.9C12.8,8.4,11.4,10.8,11.4,16.3z"/>
      	<path d="M66.8,0.5V32H55.7V20.3H47V32H35.9V0.5H47v11.6h8.7V0.5H66.8z"/>
      	<path d="M26.5,57.5V65H1.8V35.9H26v7.5H12.1v3.6h11.2v7H12.1v3.4H26.5z"/>
      	<path d="M66.8,65h-9V54.9l0.1-9.8h-0.1L52.2,65H44l-5.6-19.9h-0.2l0.1,9.8V65h-9V35.9h14.4l3.4,12.9l1.3,5.4h0.1l1.3-5.4l3.4-12.9
      		h13.7V65z"/>
      	<path d="M11.8,78.8h10.6v12.9h-5.3l-0.3-2.6C15.7,91,13.7,92,10.6,92C4.7,92,0,88.1,0,80.3c0-7.5,4.4-11.8,11.8-11.8
      		c5.6,0,8.8,1.8,10.7,6.3L15,77.4c-0.3-2.1-1.4-2.9-2.9-2.9c-2.7,0-3.9,1.7-3.9,5.7c0,4.3,1.4,5.9,4.2,5.9c2,0,3.3-0.8,3.3-2.4v0
      		h-3.8V78.8z"/>
      	<path d="M45.1,85.7v5.9H25.7V68.8h19v5.9H33.8v2.8h8.8V83h-8.8v2.7H45.1z"/>
      	<path d="M66.8,85.7v5.9H47.4V68.8h19v5.9H55.5v2.8h8.8V83h-8.8v2.7H66.8z"/>
      </svg>
    );
  }
});
