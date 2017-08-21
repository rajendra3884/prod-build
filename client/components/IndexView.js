import React from 'react';
import NavigationBar from './NavigationBar';
import { sendSellerDetails } from './../actions/SellerData';
import GooglePlayLogo from './images/google-play-badge.png';
import classnames from 'classnames';

class IndexView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      categories: ["Categry 1", "Categry 1", "Categry 1", "Categry 1", "Categry 1", "Categry 1"],
      selected_categories: [],
      name: '',
      email: '',
      phone: '',
      has_gstin: null,
      isUpdating: false,
      errors: {},
      isSubmited: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    this.parallaxbubbles();
  }

  parallaxbubbles() {
    var header_parallax = document.getElementById('header-parallax')
    var scrolltop = window.pageYOffset // get number of pixels document has scrolled vertically
    if(window.innerWidth > 1200) {
      //$('#header-parallax').css('background-position-y', -scrolltop * .20 + 'px');
    }
  }

  scrollToDiv(divId, e) {
    e.preventDefault();
    var theOffset = $('#' + divId).offset();
    $('.navbar-collapse').removeClass('in');
    $('#navbar-header').removeClass('navBarOpen');
    var height2 = $('#header-container').outerHeight();
    $('body,html').animate({
      scrollTop: theOffset.top - 60
    }, 300);
  }

  handleAddition(category) {
    var selected_categories = this.state.selected_categories;
    var listId = 'react-select-box-' + this.state.categories.indexOf(category);
    if(selected_categories.indexOf(category) === -1) {
      selected_categories.push(category);
    } else {
      selected_categories.splice(selected_categories.indexOf(category), 1);
    }
    $('#' + listId).toggleClass('react-select-box-option-selected');
    this.setState({selected_categories: selected_categories});
  }

  openCategoryDropDown(e) {
    e.preventDefault();
    $('.react-select-box-options').toggleClass('react-select-box-hidden');
    $('#category-layer').toggleClass('multi-select-outer-layer');
  }

  removeAllCategories(e) {
    $('.react-select-box-option').removeClass('react-select-box-option-selected');
    this.setState({selected_categories: []});
  }

  handleClickOutside(e) {
    if($(".react-select-box-container").length > 0 && !$(".react-select-box-container").is(e.target) && $(".react-select-box-container").has(e.target).length === 0) {
      $('.react-select-box-options').addClass('react-select-box-hidden');
      $('#category-layer').removeClass('multi-select-outer-layer');
    }
  }

  isNumeric(input) {
   return (input - 0) == input && (''+input).trim().length >= 0;
  }

  onNumericChange(e) {
    if(this.isNumeric(e.target.value)) {
      var value = e.target.value;
      value = value.replace(' ', '');
      this.setState({
        [e.target.name]: value
      });
    }
  }

  isValid() {
    let errors = {};
    let valid = true;
    if(this.state.name.trim().length === 0) {
      valid = false;
      errors.name = 'Business Name is required';
    }
    if(this.state.phone.trim().length === 0) {
      valid = false;
      errors.phone = 'Phone is required';
    }
    if(this.state.has_gstin === null) {
      valid = false;
      errors.has_gstin = true;
    }
    this.setState({errors: errors});
    return valid;
  }

  registerSupplier(e) {
    e.preventDefault();
    if(this.state.isSubmited) {
      return;
    }
    const isValid = this.isValid();
    if(isValid) {
      this.setState({isUpdating: true});
      var data = {
        'data': {
          'name': this.state.name,
          'phone': this.state.phone,
          'email': this.state.email,
          'has_gstin': this.state.has_gstin,
          'categories': this.state.selected_categories
        }
      }
      sendSellerDetails(data)().then(
        (res) => {
          $('.seller-contact-us').slideToggle();
          this.removeAllCategories();
          this.setState({ isUpdating: false, isSubmited: true, name: '', phone: '', email: '', has_gstin: null, errors: {success: 'Thank you for registering. We will contact you shortly.'}});
        },
        (err) => this.setState({ errors: err.response.data.errors, isUpdating: false })
      );
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  hasGSTIN(value) {
    this.setState({
      has_gstin: value
    });
  }

  render() {
    const { errors} = this.state
    var dropDownText = 'Selected Categories';
    if(this.state.selected_categories.length > 0) {
      dropDownText = this.state.selected_categories.toString();
    }
    if(this.state.selected_categories.length === this.state.categories.length) {
      dropDownText = 'All Categories Selected';
    }
    return (
      <div>
        <NavigationBar />
        <div className="index-page">
          <header id="header-parallax">
            <div className="header-dark full-page white-text flex-container">
              <div id="header-text" className="flex-content text-center wow fadeInDown" data-wow-delay="0.3s">
                <div className="container text-center heading font-medium">
                  Where does it come from?
                </div>
                <div className="margin-top-30">
                  <a href="#Register" className="btn-sign-up" onClick={this.scrollToDiv.bind(this, 'whyUs')}>Learn more</a>
                </div>
              </div>
              <div id="arraw">
                <a href="#Register" onClick={this.scrollToDiv.bind(this, 'whyUs')}></a>
              </div>
            </div>
          </header>
        </div>
        <div id="whyUs" className="center why-us">
          <div>
            <h1 className="bold">What is Lorem Ipsum?</h1>
            <div className="border-features"></div>
          </div>
          <div className="row margin-top-30 text-center">
            <div className="col-sm-4 col-inline-block">
              <div className="feature-card wow fadeInUp" data-wow-delay="0.3s">
                <i className="fa fa-users"></i>
                <p className="slogan">Why do we use it?</p>
                <p className="message">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
            <div className="col-sm-4 col-inline-block">
              <div className="feature-card wow fadeInUp" data-wow-delay="0.3s">
                <i className="fa fa-credit-card-alt" ></i>
                <p className="slogan">Why do we use it?</p>
                <p className="message">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
            <div className="col-sm-4 col-inline-block">
              <div className="feature-card wow fadeInUp" data-wow-delay="0.3s">
                <i className="fa fa-handshake-o" ></i>
                <p className="slogan">Why do we use it?</p>
                <p className="message">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
            <div className="col-sm-4 col-inline-block">
              <div className="feature-card wow fadeInUp" data-wow-delay="0.3s">
                <i className="fa fa-truck" ></i>
                <p className="slogan">Why do we use it?</p>
                <p className="message">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
            <div className="col-sm-4 col-inline-block">
              <div className="feature-card wow fadeInUp" data-wow-delay="0.3s">
                <i className="fa fa-phone-square" ></i>
                <p className="slogan">Dedicated Account Managers</p>
                <p className="message">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="HowItWorks" className="row how-it-works">
          <div className="center">
            <h1 className="font-medium">Why do we use it?</h1>
            <div className="border-how-it-works"></div>
          </div>
          <div className="row how-it-works-card left margin-top-30">
            <div className="col-xs-1"></div>
            <div className="col-xs-2 text-right">
              <i className="fa fa-list" aria-hidden="true"></i>
            </div>
            <div className="col-xs-5">
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <h1>Why do we use it?</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </div>
          <div className="row how-it-works-card right">
            <div className="col-xs-offset-4 col-xs-5 text-right">
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <h1>Why do we use it?</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
            <div className="col-xs-2">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
            <div className="col-xs-1"></div>
          </div>
          <div className="row how-it-works-card left">
            <div className="col-xs-1"></div>
            <div className="col-xs-2 text-right">
              <i className="fa fa-envelope-open-o" aria-hidden="true"></i>
            </div>
            <div className="col-xs-5">
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <h1>Why do we use it?</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </div>
          <div className="row how-it-works-card right">
            <div className="col-xs-offset-4 col-xs-5 text-right">
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <h1>Why do we use it?</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
            <div className="col-xs-2">
              <i className="fa fa-inr" aria-hidden="true"></i>
            </div>
            <div className="col-xs-1"></div>
          </div>
        </div>
        <div id="Register" className="seller-form-fill-up">
          <div className="row">
            <div className="seller-contact-us">
              <form className="seller-form" onSubmit={this.registerSupplier.bind(this)}>
                <p className="heading">Register with Lorem ipsum</p>
                <div className={classnames('form-group', { 'has-error': errors.name })}>
                  <label className="control-label">Business Name*</label>
                  <input className="form-control" name="name" value={this.state.name} onChange={this.onChange.bind(this)} type="text" placeholder="Enter your business name" />
                  {errors.name &&<span className="help-block"> {errors.name} </span>}
                </div>
                <div className={classnames('form-group', { 'has-error': errors.phone })}>
                  <label className="control-label">Phone Number*</label>
                  <div className="input-group">
                    <span className="input-group-addon border-radius-none">+91</span>
                    <input className="form-control" name="phone" value={this.state.phone} onChange={this.onNumericChange.bind(this)} type="tel" placeholder="Enter your phone number" />
                  </div>
                  {errors.phone &&<span className="help-block"> {errors.phone} </span>}
                </div>
                <div className="form-group">
                  <label className="control-label">Email</label>
                  <input className="form-control" name="email" value={this.state.email} onChange={this.onChange.bind(this)} type="email" placeholder="Enter your email" />
                </div>
                <div className={classnames('form-group', { 'has-error': errors.categories })}>
                  <label className="control-label">Categories*</label>
                  <div className={'react-select-box-container react-select-box-multi' + (this.state.selected_categories.length === 0 ? ' react-select-box-empty' : '')}>
                    <button className="react-select-box" onClick={this.openCategoryDropDown.bind(this)}>
                      <div className="react-select-box-label">{dropDownText}</div>
                    </button>
                    <div className="react-select-box-options react-select-box-hidden">
                      <div className="react-select-box-off-screen">
                        {this.state.categories.map((category, index) => (
                          <a
                            id={'react-select-box-' + index}
                            className={'react-select-box-option'}
                            key={'category_' + index}
                            onClick={this.handleAddition.bind(this, category)}>
                            { category }
                          </a>
                        ))}
                      </div>
                      <button className="react-select-box-close" onClick={this.openCategoryDropDown.bind(this)}>Close</button>
                    </div>
                    <div id="category-layer" onClick={this.openCategoryDropDown.bind(this)}></div>
                    {this.state.selected_categories.length > 0 ?
                    <button className="react-select-box-clear" onClick={this.removeAllCategories.bind(this)}></button> : null}
                  </div>
                  {errors.categories &&<span className="help-block"> {errors.categories} </span>}
                </div>
                <div className={classnames('form-group', { 'has-error': errors.has_gstin })}>
                  <label className="control-label inline-block" style={{marginBottom: '0px'}}>Do you have a ABCD?</label>
                  <div className="inline-block" style={{marginBottom: '0px', marginLeft: '15px'}}>
                    <label className="radio-inline"><input type="radio" name="gstin" onClick={this.hasGSTIN.bind(this, true)} />Yes</label>
                    <label className="radio-inline"><input type="radio" name="gstin" onClick={this.hasGSTIN.bind(this, false)} />No</label>
                  </div>
                  {errors.has_gstin && <span className="help-block"> {errors.has_gstin} </span>}
                </div>
                <button disabled={this.state.isUpdating} className="btn btn-default" type="submit">Register</button>
                <div className="text-center">
                  {errors.form &&<div className="alert alert-danger padding-10 border-radius-none margin-top-10 bold inline-block"> {errors.form} </div>}
                </div>
              </form>
            </div>
            <div className="text-center">
              {errors.success &&<div className="white-background padding-10 border-radius-none margin-top-30 bold inline-block"> {errors.success} </div>}
            </div>
          </div>
        </div>
        <div className="container footer-links">
          <div className="text-center center-block">
            Facebook <a href="" target="_blank"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
            Email <a href=""><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexView;
