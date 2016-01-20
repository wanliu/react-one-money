import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../config.json';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  _handleSignIn() {
    // const url = [ONE_MONEY_PREFIX, SALES_START_DATE, '/#/list'].join('');
    const url = `${config[__ENV__].AUTHORIZED_PATH}/#/list`;

    const signup_url = `${config[__ENV__].SIGNUP_URL}`;

    location.href = signup_url + '?callback=' + encodeURIComponent(url) + '&goto_one_money=true';
  }

  render() {
    return (
      <div className="page home">
        <img className="poster" src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/100159/3c6e051086bc13b4fccca045a3efe187.jpg"/>
        <div className="introduction">
          <img className="introduction-top" src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/100159/8ca4d5a71c6b3e72734c6d238b5a88cf.png"/>
          <main className="introduction-text">
            text
          </main>
          <img
            className="introduction-bottom"
            src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/100159/3a4c3db9b8d16578ebd1b94b9cbcbb5b.png"
            onClick={this._handleSignIn.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  };
}

export default connect(mapStateToProps)(HomePage);
