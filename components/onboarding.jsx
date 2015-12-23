Onboarding = React.createClass({
  propTypes: {
    show: React.PropTypes.bool,
    currentUserId: React.PropTypes.string
  },

  getInitialState() {
    return {
      show: this.props.show,
      currentSlide: 0,
      slides: [
        {
          message: 'OhEmGee is a simple way for designers and their teams to collaborate.',
          image: '',
          cta: 'Neat!'
        },
        {
          message: 'Add and organize images on your projects.',
          image: '',
          cta: 'Sweet, what else?'
        },
        {
          message: 'Your team can comment individual images or the project as a whole.',
          image: '',
          cta: 'Comments are great...'
        },
        {
          message: 'Anyone with the URL to this project can see it. Share it with all members of your team.',
          image: '',
          cta: 'Anything else?'
        },
        {
          message: 'Once you’ve created a project, only *you* can edit it.',
          image: '',
          cta: 'Get started!'
        }
      ]
    };
  },

  handleAdvanceSlide() {
    if(this.state.currentSlide < this.state.slides.length - 1) {
      this.setState({currentSlide: this.state.currentSlide + 1});
    } else {
      Meteor.call('completeOnboarding', this.props.currentUserId, (error, success) => {
        if(success) {
          this.setState({show: false});
        }
      })
    }
  },

  render() {
    let buttonBackgroundImage = `linear-gradient(to right, #9743b3 ${this.state.currentSlide / (this.state.slides.length - 1) * 100}%, transparent ${this.state.currentSlide / this.state.slides.length * 100}%)`;
    let buttonStyle = {
      backgroundImage: buttonBackgroundImage
    };
    return (
      <span>
        {this.state.show ?
          <div className="onboarding">
            {this.state.slides.map((slide, i) => {
              if(this.state.currentSlide === i) {
                return (
                  <div className="onboarding__slide" key={i}>
                    <p className="onboarding__message">
                      {slide.message}
                    </p>
                    <button
                      className="onboarding__button"
                      onClick={this.handleAdvanceSlide}
                      style={buttonStyle}>
                      {slide.cta}
                    </button>
                  </div>
                );
              }
            })}
            <footer className="onboarding__footer">
              <small>Skip this and just <a onClick={this.handleGetStarted}>get started</a></small>
            </footer>
          </div>
        : null}
      </span>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    completeOnboarding(id) {
      check(id, String);

      return Meteor.users.update(id, {
        $set: {
          'profile.onboarded': true
        }
      });
    }
  })
}
