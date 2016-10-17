import React, {Component} from 'react';

export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
  }

  // showPrev(e) {
  //   e.preventDefault();

  //   let currentIndex = this.props.currentIndex;

  //   if (currentIndex > 0) {
  //     currentIndex -= 1;

  //     const { onChange } = this.props;

  //     if (typeof onChange === 'function') {
  //       onChange(currentIndex);
  //     }
  //   }
  // }

  // showNext(e) {
  //   e.preventDefault();

  //   let currentIndex = this.props.currentIndex;
  //   const { maxIndex } = this.props;

  //   if (currentIndex < maxIndex) {
  //     currentIndex += 1;

  //     const { onChange } = this.props;

  //     if (typeof onChange === 'function') {
  //       onChange(currentIndex);
  //     }
  //   }
  // }

  render() {
    const { gifts, currentIndex } = this.props;
    const length = gifts.length;
    const wrapWidth = length * 100 + '%';
    const itemWidth = 100 / length + '%';
    const offsetLeft = - 100 * currentIndex + '%';
    const wrapStyle = { 'width': wrapWidth, 'marginLeft': offsetLeft };

    return (
      <div className="carousel-container">
        <div className="carousel-list" ref="carousel_list">
          <div className="carousel-item-wrap" style={wrapStyle}>
            { gifts.map(gift =>
              <div className="preview-item" style={{width: itemWidth}} key={gift.id}>
                <img src={ gift.cover_url } className="item-cover" />
                <div className="gift-brief">
                  <div className="gift-title">{ gift.title }</div>
                  <div className="gift-price">价值约&nbsp;&#165;{ gift.public_price }&nbsp;元</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ImageCarousel.propTypes = {
  currentIndex: React.PropTypes.number,
  onChange: React.PropTypes.func,
  maxIndex: React.PropTypes.number,
};
