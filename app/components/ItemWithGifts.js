import React, {Component} from 'react';
import ImageCarousel from './ImageCarousel';
import PreviewItem from './PreviewItem';

export default class ItemWithGifts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };
  }

  changeCurrentIndex(index) {
    this.setState({'currentIndex': index});
  }

  hideGifts(e) {
    e.preventDefault();

    this.refs.giftContainer.style.display = 'none';
  }

  showGifts(e) {
    e.preventDefault();

    this.refs.giftContainer.style.display = 'block';
  }

  render() {
    const {title, cover_urls, price, ori_price, id, fare, gifts} = this.props;
    const max = gifts.length - 1;

    return (
      <li className="item">
        <a href={`${__GIFT_ITEM_LINK__}${id}`}>
          <div className="left">
            {Number(fare) == 0 && <img className="mailing-fee" src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/102/038bffe812178917d1768b9b3d6481ce.png"/>}
            <img className="avatar" src={cover_urls[0]}/>
          </div>
          <div className="right">
            <h3 className="title">{title}</h3>
            <span className="price">￥{price}</span>
            <span className="ori_price">原价:<s>{ori_price}</s></span>
            <div className="item-actions">
              <div className="review-gifts" onClick={this.showGifts.bind(this)}>查看礼品</div>
              <div className="buy-now">马上抢购</div>
            </div>
          </div>
          <div className="item-gifts" ref="giftContainer">
            <div className="gift-container">
              <ImageCarousel gifts={gifts} currentIndex={this.state.currentIndex} maxIndex={max} onChange={this.changeCurrentIndex.bind(this)} />
              <div className="thumbnail-container">
                <div className="gift-title"><img src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/102/b56e295ae79eb1ffdd6f4e0ffe54cd0c.png" /></div>
                <div className="thubnail-list">
                  {gifts.map((gift, index) => <PreviewItem gift={gift} currentIndex={this.state.currentIndex}
                    onChange={this.changeCurrentIndex.bind(this)} index={index} maxIndex={max} key={gift.id}/> )}
                </div>
              </div>
            </div>
          </div>
          <div className="top-shadow"></div>
          <div className="left-shadow"></div>
          <div className="bottom-shadow"></div>
          <div className="right-shadow"></div>
        </a>
      </li>
    );
  }
}
