import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

const PageTemplate = ({ list, search }) => (
  <div className={cx('page-template')}>
    <div className={cx('search-wrapper')}>{search}</div>
    <section className={cx('list-wrapper')}>{list}</section>
    <footer>
      <Link to='/terms' className={cx('footer')}>이용 약관</Link>
      <Link to='/privacy' className={cx('footer')}>개인정보처리방침</Link>
    </footer>
  </div>
);

PageTemplate.propTypes = {
  list: PropTypes.element,
  search: PropTypes.element,
};

PageTemplate.defaultProps = {
  list: null,
  search: null,
};

export default PageTemplate;
