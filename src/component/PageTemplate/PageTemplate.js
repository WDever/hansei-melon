import React from 'react';
import classNames from 'classnames/bind';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

const PageTemplate = ({ children }) => {
  return (
    <div className={cx('page-tmeplate')}>
      {/* <section className={cx('search-bar')}>
        {search}
      </section> */}
      <section className={cx('list-wrapper')}>
        <div className={cx('title')}>
          TOP 100
        </div>
        {children}
      </section>
    </div>
  );
}

export default PageTemplate;
