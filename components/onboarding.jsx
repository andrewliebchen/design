const slides = [
  'OhEmGee is a simple way for designers and their teams to collaborate.',
  'Add and organize images on your projects.',
  'Your team can comment individual images or the project as a whole.',
  'Anyone with the URL to this project can see it. Share it with all members of your team.',
  'Once you’ve created a project, only *you* can edit it.'
];

Onboarding = React.createClass({
  propTypes: {
    show: React.PropTypes.bool
  },

  getInitialState() {
    return {
      show: this.props.show,
      currentSlide: 0
    };
  },

  handleAdvanceSlide() {
    this.setState({currentSlide: this.state.currentSlide + 1});
  },

  handleGetStarted() {
    this.setState({show: false});
  },

  render() {
    let buttonBackgroundImage = `linear-gradient(to right, #c189d3 ${this.state.currentSlide / slides.length * 100}%, transparent ${this.state.currentSlide / slides.length * 100}%)`;
    let buttonStyle = {
      backgroundImage: buttonBackgroundImage
    };
    console.log(buttonStyle);
    return (
      <span>
        {this.state.show ?
          <div className="onboarding">
            <div className="onboarding__content">
              {slides.map((message, i) => {
                if(this.state.currentSlide === i) {
                return (
                  <div className="onboarding__slide" key={i}>
                    <p>{message}</p>
                  </div>
                );
              }
              })}
              {this.state.currentSlide < slides.length - 1 ?
                <button
                  className="onboarding__button"
                  onClick={this.handleAdvanceSlide}
                  style={buttonStyle}>
                  Next
                </button>
              :
                <button
                  className="onboarding__button onboarding__button__final"
                  onClick={this.handleGetStarted}>
                  Get started
                </button>
              }
            </div>
          </div>
        : null}
      </span>
    );
  }
});
