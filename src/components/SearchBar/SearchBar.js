import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchBar.scss';
import { ReactComponent as Icon } from './searchIcon.svg';

const cx = classNames.bind(styles);

class SearchBar extends React.Component {
  state = {
    placeholder: '',
  }

  componentDidMount = () => {
    const { code } = this.props;
    const hour = moment().format('H') * 3600;
    const min = moment().format('m') * 60;
    const sec = moment().format('s') * 1;

    const sum = hour + min + sec;

    // if(sum < 30000) {
    //   setInterval(() => this.setTime(), 1000);
    // }

    setInterval(() => this.setTime(), 1000);

    if (sum >= 30000 && sum <= 43200 && code !== 423) {
      this.setState(() => ({
        placeholder: '',
      }));
    }

    else if (sum > 43200 || code === 423) {
      this.setState(() => ({
        placeholder: '오늘의 예약이 마감되었습니다.',
      }));
    }
  }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log('Search Bar');
  // }
  
  

  setTime = () => {
    const { code } = this.props;
    const { placeholder } = this.state;

    const hour = moment().format('H');
    const min = moment().format('m');
    const sec = moment().format('s');
 
    const sum = hour * 3600 + min * 60 + sec * 1;

    if(sum < 30000) {
      this.setState(() => ({
        placeholder: `예약시간 전 입니다. - ${hour} : ${min} : ${sec}`       
      }));
    }

    else if(sum === 30000) {
      this.setState(() => ({
        placeholder: '',
      }));
    }

    else if ((sum > 43200 || code === 423) && placeholder !== '오늘의 예약이 마감되었습니다.') {
      this.setState(() => ({
        placeholder: '오늘의 예약이 마감되었습니다.',
      }));
    }
  }
  
  render() {
    const { changer, onChange, canReservation, onKeyPress, handleKeyDown, onFocus, onClick, code } = this.props;
    const { placeholder } = this.state;
    return (
      <div className={cx('search-template')}>
        {changer}
        <form className={cx('search-bar')} onSubmit={onClick}>
          <input
            className={cx('search')}
            onChange={onChange}
            // value={value}
            placeholder={canReservation ? placeholder : ''}
            // onKeyPress={onKeyPress}
            // onKeyDown={handleKeyDown}
            onFocus={() => onFocus(true)}
            onBlur={() => onFocus(false)}
          />
          <button type="submit">
            <Icon className={cx('icon')} />
          </button>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  // value: PropTypes.string,
  // reservation: PropTypes.bool,
  // placeholder: PropTypes.string,
  onFocus: PropTypes.func,
};

SearchBar.defaultProps = {
  onChange: () => console.log('no onChange!'),
  onClick: () => console.log('no onClick!'),
  // value: '',
  // reservation: true,
  // placeholder: '',
  onFocus: () => console.log('no onFocus!'),
};

export default SearchBar;
