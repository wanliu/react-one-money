import React, {Component} from 'react';

export default class PreviewItem extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e.preventDefault();

    const { onChange, index } = this.props;

    if (typeof onChange === 'function') {
      onChange(index);
    }
  }

  render() {
    const { gift, currentIndex, index } = this.props;
    const klass = ['thubnail-list-item', currentIndex == index ? ' active' : ''].join('');

    return (
      <div className={klass} onClick={this.handleClick.bind(this)}><img src={ gift.cover_url } /></div>
    );
  }
}

PreviewItem.propTypes = {
  currentIndex: React.PropTypes.number,
  index: React.PropTypes.number,
  onChange: React.PropTypes.func,
  maxIndex: React.PropTypes.number,
};
