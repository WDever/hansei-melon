import React from 'react';
import classNames from 'classnames/bind';
import FacebookLogin from 'react-facebook-login';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import styles from './LoginSearchChanger.scss';

const cx = classNames.bind(styles);

const LoginSearchChanger = ({ changeResults, cat, loginCallback }) => (
  <div className={cx('change-template')}>
    <div className={cx('change-wrapper')}>
      <div
        className={cx('change', { active: cat === 1 })}
        onClick={() => changeResults(1)}
      >
        제목
      </div>
      <div
        className={cx('change', { active: cat === 2 })}
        onClick={() => changeResults(2)}
      >
        가수
      </div>
      <div
        className={cx('change', { active: cat === 3 })}
        onClick={() => changeResults(3)}
      >
        앨범
      </div>
    </div>
    <FacebookLogin
      appId="254473261900602"
      // autoLoad
      fields="name,email,picture"
      callback={loginCallback}
      cssClass="fb"
      icon={<TiSocialFacebookCircular />}
      textButton="FACEBOOK ID로 로그인 하기"
      isMobile
    />
  </div>
);

export default LoginSearchChanger;
