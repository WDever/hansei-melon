import React from 'react';
import FacebookLogin from 'react-facebook-login';
import classNames from 'classnames/bind';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import styles from './FacebookLogin.scss';

const cx = classNames.bind(styles);

const FaceBookLogin = ({ loginCallback, autoLoad, visiblity }) => (
  <FacebookLogin
    appId="254473261900602"
    autoLoad={autoLoad}
    fields="name,email,picture"
    callback={loginCallback}
    cssClass={cx(visiblity ? 'fb' : 'fbnone')}
    icon={<TiSocialFacebookCircular />}
    textButton="FACEBOOK ID로 로그인 하기"
    isMobile
  />
  );

export default FaceBookLogin;
