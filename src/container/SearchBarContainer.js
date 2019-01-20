import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import * as api from '../lib/api';
import * as searchActions from '../store/modules/search';

class SearchBarContainer extends React.Component {
  componentDidMount = () => {
    this.getCHECK();

    const { SearchActions, reservation } = this.props;

    const hour = moment().format('H');
    const min = moment().format('m');

    if(min >= '20' && min <= '59') { // 신청시간 안에 들어왔을때. true를 false로
      if(hour >= '8' && hour <=  '11' && reservation) {
        SearchActions.start();
      }
    }

    this.handleStarter(hour);
  }

  getCHECK = async () => {
    const { reservation, SearchActions } = this.props;
    try {
      const response = await api.getCHECK();
      const { code } = response.data;

      if(code === 423 && !reservation) {
        SearchActions.start();
        console.log(reservation);
      }

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  handleStarter = (hour) => {
    // eslint-disable-next-line no-unused-vars
    this.starter = 8 >= 12 ? setInterval(() => this.overTimeHandler(), 1000) : setInterval(() => this.TimeHandler(), 1000);
  }

  overTimeHandler = () => { // 12시 이후 시간 관리 로직
    const { SearchActions, reservation } = this.props;

    const hour = moment().format('H');
    const min = moment().format('m');
    const sec = moment().format('s');

    const total = 116400 - (Number(hour * 3600) + Number(min * 60) + Number(sec));

    const remainHour = Math.floor(total / 3600);
    const remainMin = Math.floor((total - remainHour * 3600) / 60);
    const remainSec = total - remainHour * 3600 - remainMin * 60;

    if(!reservation) SearchActions.start();

    SearchActions.setTime(remainHour, remainMin, remainSec);

    if(hour === '0') {
      clearInterval(this.starter);
      this.handleStarter();
    }

    // console.log(reservation);
    // console.log(remainHour);
    // console.log(remainMin);
    // console.log(remainSec);
  }

  TimeHandler = () => { // 8시 20분 이전 시간 관리 로직
    const { SearchActions, reservation } = this.props;

    const hour = '8';
    const min = moment().format('m');
    const sec = moment().format('s');

    const total = 30000 - (Number(hour * 3600) + Number(min * 60) + Number(sec));

    const remainHour = Math.floor(total / 3600);
    const remainMin = Math.floor((total - remainHour * 3600) / 60);
    const remainSec = total - remainHour * 3600 - remainMin * 60;

    if(min >= '20') { // TimeHandler가 실행중일때 8시 20분이 넘으면 reservation 반전
      if(hour === '8' && reservation) {
        SearchActions.start();
        console.log('th active')
      }
    }

    if(hour === '12' && !reservation) { // reservation이 false이고 12시가 되면 reservation 반전
      console.log('th2');
      SearchActions.start();
      clearInterval(this.starter);
      this.handleStarter();
    }

    SearchActions.setTime(remainHour, remainMin, remainSec);
  }
  

  handleChange = e => {
    const { value } = e.target;
    const { SearchActions } = this.props;

    SearchActions.input(value);
  }

  render() {
    const { input, placeholder, reservation } = this.props;
    const { handleChange } = this;
    return (
      <SearchBar
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        reservation={reservation}
      />
    );
  }
}

const mapStateToProps = ({ search }) => ({
  input: search.input,
  hour: search.hour,
  min: search.min,
  sec: search.sec,
  placeholder: search.placeholder,
  reservation: search.reservation
});

const mapDispatchToProps = dispatch => ({
  SearchActions: bindActionCreators(searchActions, dispatch)
});

SearchBarContainer.propTypes = {
  reservation: PropTypes.bool,
  // hour: PropTypes.number,
  // min: PropTypes.number,
  // sec: PropTypes.number,
  input: PropTypes.string,
  placeholder: PropTypes.string
};

SearchBarContainer.defaultProps = {
  reservation: true,
  input: '',
  placeholder: ''
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarContainer);
