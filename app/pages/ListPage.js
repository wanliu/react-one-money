import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from 'halogen/ScaleLoader';
import DRCode from '../components/DRCode';
import ItemWithGifts from '../components/ItemWithGifts';
import Item from '../components/Item';
import * as Actions from '../actions';
import ItemsGroup from '../components/ItemsGroup';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDRText: false
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(Actions.fetchList());
    dispatch(Actions.fetchOneMoney());
    dispatch(Actions.fetchItemsWithGifts());
  }

  onScroll(e) {
    const {scrollTop, scrollHeight, offsetHeight} = e.target;
    if (scrollTop + offsetHeight == scrollHeight) {
      this.setState({showDRText: true});
    } else {
      this.setState({showDRText: false});
    }
  }

  slideDown() {
    const timestamp = `${__TIMESTAMP__}`;
    let data = JSON.parse(localStorage.getItem(timestamp));

    if (!data) {
      data = { 'introductionDisabled': false };
      localStorage.setItem(timestamp, JSON.stringify(data));
    }

    if (data.introductionDisabled) return;

    const link = this.refs['share-link'];
    const page = this.refs['list-page'];
    const { offsetHeight } = link;

    page.style.top = offsetHeight + 'px';
  }

  slideUp(e) {
    e.stopPropagation();

    const page = this.refs['list-page'];
    page.style.top = '0';

    const timestamp = `${__TIMESTAMP__}`;
    const data = JSON.parse(localStorage.getItem(timestamp));
    data.introductionDisabled = true;
    localStorage.setItem(timestamp, JSON.stringify(data));
  }

  sortByPrice(priceArr) {
    const {list: {items}, dispatch} = this.props;
    const boundActionCreators = bindActionCreators(Actions, dispatch);
    return priceArr.map(price =>
      <ItemsGroup
        key={price}
        price={price}
        items={items.filter(item => item.price == price && item.is_card != 'true')}
        boundActionCreators={boundActionCreators}
      />);
  }

  otherPrice(priceArr) {
    const {list: {items}, dispatch} = this.props;
    const boundActionCreators = bindActionCreators(Actions, dispatch);
    return (
      <ItemsGroup
        key="other"
        price="other"
        items={items.filter(item => !priceArr.includes(+item.price) && item.is_card != 'true')}
        boundActionCreators={boundActionCreators}
      />
    );
  }

  render() {
    const {
      list: { listFetched, header, footer, itemsWithGifts, items },
      dispatch
    } = this.props;

    const boundActionCreators = bindActionCreators(Actions, dispatch);
    const headerHTML = typeof header == 'string' ? header.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : '';
    const footerHTML = typeof footer == 'string' ? footer.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : '';
    const cardItems = items.filter(item => item.is_card == 'true');

    let sections = null;

    if (itemsWithGifts.length > 0) {
      sections = (
        <div className="gifts-items-container">
          <div className="gift-flag">
            <img src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/102/be36fef84b9e275eadfaf66993e76e54.png" />
          </div>
          <div className="sub-title">
            生产日期最新&nbsp;<b>+</b>&nbsp;珍贵礼品&nbsp;,&nbsp;让你双重优惠
          </div>
          {itemsWithGifts.map(item => <ItemWithGifts key={item.id} {...item} {...boundActionCreators} />)}
        </div>
      );
    }

    const isCard = true;

    return (
      <div className="page-container">
        <div className="container">
          {__QR_CODE__ && <DRCode showText={this.state.showDRText}/>}
          <div className="list-page-container" onScroll={this.onScroll.bind(this)}>
            <span className="close-btn" onClick={this.slideUp.bind(this)}>
              <img src="http://wanliu-piano.b0.upaiyun.com/uploads/shop_category/image/a85ffb6fdda0f6a165b2a0be83247f25.png" />
            </span>
            { __SHOW_INTRODUCE__ &&
              <a className="share-link" ref="share-link" href={__INTRODUCTION_LINK__}>
                <img className="share-pic" src={__INTRODUCTION_POSTER__}
                  onLoad={this.slideDown.bind(this)}/>
              </a>
            }
            <div className="list-page" ref="list-page">
              <img className="list-poster" src={__LIST_IMG__}/>
              {!listFetched && <div style={{textAlign: 'center'}}><Loading color="#FFF" size="9px" margin="4px"/></div>}
              <div dangerouslySetInnerHTML={{__html: headerHTML }}></div>
              <ul className="list">
                {this.sortByPrice([1, 3, 5, 10])}
                {this.otherPrice([1, 3, 5, 10])}
                {sections}
              </ul>
              <div className="coupon-flag">
                <img src={__COUPON_IMG_URL__} />
              </div>
              <ul className="wx-cards">
                {cardItems.map(item => <Item key={item.id} {...item} {...boundActionCreators} isCard={isCard} />)}
              </ul>
              <div dangerouslySetInnerHTML={{__html: footerHTML }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list
  };
}

export default connect(mapStateToProps)(ListPage);
