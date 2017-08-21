import React from 'react';
import 'jquery';
import './javascript/main';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import  './styles/animate.css';
import  './styles/styles.css';
import  './styles/selectBox.css';

class App extends React.Component {
  componentDidMount() {
    //new WOW().init();
  }
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
