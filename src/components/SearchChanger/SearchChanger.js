import React from 'react';
import PropTypes from 'prop-types';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import FacebookLogin from 'react-facebook-login';
import classNames from 'classnames/bind';
import styles from './SearchChanger.scss';

const cx = classNames.bind(styles);

// const SearchChanger = ({
//   changeResults,
//   cat,
//   loginCallback,
//   isLogin,
//   userInfo,
//   logout,
//   isLoaded,
//   autoLogin,
// }) => {
//   if (isLogin) {
//     return (
//       <div className={cx('change-template')}>
//         <div className={cx('change-wrapper')}>
//           <div
//             className={cx('change', { active: cat === 1 })}
//             onClick={() => changeResults(1)}
//             onBlur={() => console.log('success')}
//           >
//             제목
//           </div>
//           <div
//             className={cx('change', { active: cat === 2 })}
//             onClick={() => changeResults(2)}
//             onBlur={() => console.log('success')}
//           >
//             가수
//           </div>
//           <div
//             className={cx('change', { active: cat === 3 })}
//             onClick={() => changeResults(3)}
//             onBlur={() => console.log('success')}
//           >
//             앨범
//           </div>
//         </div>
//         <div className={cx('userInfo')}>
//           <span>{userInfo.name} 님</span>
//           <span className={cx('logout')} onClick={logout}>
//             로그아웃
//           </span>
//         </div>
//       </div>
//     );
//   }

//   // if (!isLogin && isLoaded) {
//   //   return (
//   //     <div className={cx('change-template')}>
//   //       <div className={cx('change-wrapper')}>
//   //         <div className={cx('change', { active: cat === 1 })} onClick={() => changeResults(1)} onBlur={() => console.log('success')}>
//   //           제목
//   //         </div>
//   //         <div className={cx('change', { active: cat === 2 })} onClick={() => changeResults(2)} onBlur={() => console.log('success')}>
//   //           가수
//   //         </div>
//   //         <div className={cx('change', { active: cat === 3 })} onClick={() => changeResults(3)} onBlur={() => console.log('success')}>
//   //           앨범
//   //         </div>
//   //       </div>
//   //       <FacebookLogin
//   //         appId="254473261900602"
//   //         autoLoad
//   //         fields="name,email,picture"
//   //         callback={loginCallback}
//   //         cssClass="fb"
//   //         icon={<TiSocialFacebookCircular />}
//   //         textButton="FACEBOOK ID로 로그인 하기"
//   //       />
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className={cx('change-template')}>
//       <div className={cx('change-wrapper')}>
//         <div
//           className={cx('change', { active: cat === 1 })}
//           onClick={() => changeResults(1)}
//           onBlur={() => console.log('success')}
//         >
//           제목
//         </div>
//         <div
//           className={cx('change', { active: cat === 2 })}
//           onClick={() => changeResults(2)}
//           onBlur={() => console.log('success')}
//         >
//           가수
//         </div>
//         <div
//           className={cx('change', { active: cat === 3 })}
//           onClick={() => changeResults(3)}
//           onBlur={() => console.log('success')}
//         >
//           앨범
//         </div>
//       </div>
//       <FacebookLogin
//         appId="254473261900602"
//         autoLoad={autoLogin}
//         // autoLoad
//         fields="name,email,picture"
//         callback={loginCallback}
//         cssClass="fb"
//         icon={<TiSocialFacebookCircular />}
//         textButton="FACEBOOK ID로 로그인 하기"
//         isMobile
//       />
//     </div>
//   );
// };

class SearchChanger extends React.Component {
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   const { isLogin, userInfo, cat } = this.props;
  //   return nextProps.userInfo.name !== userInfo.name || cat !== nextProps.cat;
  // };

  render() {
    const {
      isLogin,
      cat,
      changeResults,
      userInfo,
      logout,
      autoLogin,
      loginCallback,
    } = this.props;

    if (autoLogin) {
      return (
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
          <div className={cx('userInfo')}>
            <span>{userInfo.name} 님</span>
            <span className={cx('logout')} onClick={logout}>
              로그아웃
            </span>
          </div>
        </div>
      );
    }

    if (!autoLogin) {
      return (
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
            autoLoad={autoLogin}
            fields="name,email,picture"
            callback={loginCallback}
            cssClass="fb"
            icon={<TiSocialFacebookCircular />}
            textButton="FACEBOOK ID로 로그인 하기"
            isMobile
          />
        </div>
      );
    }

    return (
      <div />
    )
  }
}

SearchChanger.propTypes = {
  changeResults: PropTypes.func,
  cat: PropTypes.number,
};

SearchChanger.defaultProps = {
  changeResults: () => console.log('ERROR'),
  cat: 1,
};

export default SearchChanger;
