import fetch from 'isomorphic-fetch';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatTime} from '../helper';
import {_fetch} from '../helper';

const INVITED_IMG = 'http://wanliu-piano.b0.upaiyun.com/uploads/shop_category/image/978027f6309a96cb1463165fadd301ac.png';
const SIGNUP_IMG = 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/100159/3a4c3db9b8d16578ebd1b94b9cbcbb5b.png';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_at: '',
      end_at: '',
      showArrow: true
    };
  }

  componentDidMount() {
    fetch(`${__API__}/${__ONE_MONEY_ID__}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        start_at: formatTime(Date.parse(json.start_at)),
        end_at: formatTime(Date.parse(json.end_at)),
      });
    });
  }

  onScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      this.setState({showArrow: false});
    } else {
      this.setState({showArrow: true});
    }
  }

  _handleSignup() {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const { history, location } = this.props;
    const { query } = location;
    let fromSeed = query.fromSeed;

    if (!fromSeed) {
      try {
        fromSeed = localStorage.getItem('from_seed_id');
        const expire_time = +localStorage.getItem('from_seed_expire_time');
        fromSeed = expire_time >= Date.now() ? fromSeed : null;
      } catch (e) {
        console.log('error info', e);
        fromSeed = null;
      }
    }

    const q = !!fromSeed ? `?from_seed=${fromSeed}` : '';

    _fetch(`${__API__}/${__ONE_MONEY_ID__}/signup${q}`, 'put')
    .then(() => {
      history.pushState(null, '/list');
    }).catch(err => {
      if (+err.message == 401) {
        const url = `${origin}${pathname}${q}`;
        window.location.href = __SIGNUP_URL__ + '?callback=' + encodeURIComponent(url) + '&goto_one_money=true';
      }
    });
  }


  downBtnClick() {
    const {homePage} = this.refs;
    homePage.scrollTop = homePage.scrollHeight - homePage.clientHeight;
  }

  render() {
    const { fromSeed } = this.props.seed;
    let fragment;

    if (fromSeed) {
      const { owner_avatar_url } = fromSeed;

      fragment = (
        <div className="img-locator">
          <div className="share-person">
            <img src={owner_avatar_url} />
          </div>
          <img className="introduction-bottom" src={INVITED_IMG} />
        </div>
      );
    } else {
      fragment = (<img className="introduction-bottom" src={SIGNUP_IMG} />);
    }

    return (
      <div className="page-container">
        <div className="container">
          {this.state.showArrow && <img id="down-arrow" onClick={this.downBtnClick.bind(this)} src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/102/17f5c4fb9babb034ac10439036473b85.png"/>}
          <div className="page home-page" ref="homePage" onScroll={this.onScroll.bind(this)}>
            <img style={{minHeight: '400px'}} className="poster" src={__HOME_IMG__}/>
            <div className="introduction">
              <img className="introduction-top" src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/100159/8ca4d5a71c6b3e72734c6d238b5a88cf.png"/>
              <div className="introduction-text">
                <b>参与方式:</b>
                <div className="indent">关注我们的"耒阳街上"公众号之后，即可参与我们的线上抢购伊利大礼包活动</div>

                <b>抢购规则:</b>
                <div className="indent">每位关注的用户（仅限耒阳市区）在一次活动中可抢购多件商品，抢完即刻恢复正常售价。抢购成功后请尽快确认订单。未确认的订单15分钟内将自动回收。确认订单后您还可以通过分享给好友获得额外的抢购机会。</div>

                <b>活动时间:</b>
                <div className="start-end-time">
                  {this.state.start_at} 至 {this.state.end_at}
                </div>

              </div>
              <div className="signup-container" onClick={this._handleSignup.bind(this)}>
                {fragment}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    seed: state.seed
  };
}

export default connect(mapStateToProps)(HomePage);
