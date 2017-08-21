import React from 'react';
import NavigationBar from './NavigationBar';
import { sendSellerDetails } from './../actions/SellerData';
import GooglePlayLogo from './images/google-play-badge.png';
import classnames from 'classnames';

class TermsConditionsView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    $('.terms-row').css('display', 'block');
  }

  render() {
    return (
      <div className="full-page">

      </div>
    );
  }
}

export default TermsConditionsView;
