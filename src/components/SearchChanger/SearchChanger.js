import React from 'react';
import PropTypes from 'prop-types';
import { TiSocialFacebookCircular } from 'react-icons/ti';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookLogin from 'react-facebook-login';
import classNames from 'classnames/bind';
import styles from './SearchChanger.scss';

const cx = classNames.bind(styles);

const SearchChanger = ({ changeResults, cat, changeFocus }) => {
  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <div className={cx('change-template')}>
      <div className={cx('change-wrapper')}>
        <div className={cx('change', { active: cat === 1 })} onClick={() => changeResults(1)} onBlur={() => console.log('success')}>
          제목
        </div>
        <div className={cx('change', { active: cat === 2 })} onClick={() => changeResults(2)} onBlur={() => console.log('success')}>
          가수
        </div>
        <div className={cx('change', { active: cat === 3 })} onClick={() => changeResults(3)} onBlur={() => console.log('success')}>
          앨범
        </div>
      </div>
      {/* <FacebookLogin
        appId="254473261900602"
        autoLoad
        fields="name,email,picture"
        callback={responseFacebook}
        render={() => (
          <button className={cx('fb')} type="button">This is my custom FB button</button>
        )}
      /> */}
      <FacebookLogin
        appId="254473261900602"
        autoLoad
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="fb"
        icon={<TiSocialFacebookCircular />}
        textButton="FACEBOOK ID로 로그인 하기"
      />
    </div>
  );
}

SearchChanger.propTypes = {
  changeResults: PropTypes.func,
  cat: PropTypes.number,
}

SearchChanger.defaultProps = {
  changeResults: () => console.log('ERROR'),
  cat: 1,
}

export default SearchChanger;
