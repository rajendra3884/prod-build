import React from 'react';
import { offSetManager } from './javascript/main';
import Logo from './images/new_logo.png';
import White_logo from './images/new_logo.png';
class NavigationBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleClickOutside(e) {
    if($(".navbar-header").length > 0 && !$(".navbar-header").is(e.target) && $(".navbar-header").has(e.target).length === 0) {
      if($('.navbar-collapse').hasClass('in')) {
        $('.navbar-collapse').removeClass('in');
        $('#navbar-header').removeClass('navBarOpen');
      }
    }
  }

  handleScroll() {
    offSetManager();
  }

  scrollToDiv(divId, e) {
    e.preventDefault();
    var theOffset = $('#' + divId).offset();
    $('.navbar-collapse').removeClass('in');
    $('#navbar-header').removeClass('navBarOpen');
    var height2 = 60 //$('#header-container').outerHeight();
    $('body,html').animate({
      scrollTop: theOffset.top - height2
    }, 300);
  }

  navBarToggle() {
    $('.navbar-collapse').toggleClass('in');
    $('#navbar-header').toggleClass('navBarOpen');
  }

  render() {
    return(
        <div className="navigation-bar">
          <nav id="header" className="navbar navbar-fixed-top">
            <div id="header-container" className="container navbar-container">
              <div id="navbar-header" className="navbar-header">
                <button onClick={this.navBarToggle.bind(this)} type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a id="brand" className="navbar-brand" href="#">
                  <img className="logo-image pink_logo" src={Logo}/>
                  <img className="logo-image white_logo" src={White_logo}/>
                </a>
              </div>
              <div id="navbar" className="collapse navbar-collapse pull-right">
                <ul className="nav navbar-nav">
                  <li><a href="#whyUs" onClick={this.scrollToDiv.bind(this, 'whyUs')}>Why Us ?</a></li>
                  <li><a href="#HowItWorks" onClick={this.scrollToDiv.bind(this, 'HowItWorks')}>How it works</a></li>
                  <li><a href="#Register" onClick={this.scrollToDiv.bind(this, 'Register')}>Register</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
}

export default NavigationBar;
