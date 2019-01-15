import React from 'react';
import classNames from 'classnames/bind';
import MusicListTemplate from '../MusicListTemplate';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

const PageTemplate = ({ list, search, }) => {
  return (
    <div className={cx('page-tmeplate')}>
      <section className={cx('search-bar')}>
        {search}
      </section>
      <section className={cx('list-wrapper')}>
        <MusicListTemplate
          list={list}
        />
      </section>
    </div>
  );
}

export default PageTemplate;
