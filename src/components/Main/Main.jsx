import React from 'react';
import PageTemplate from '../PageTemplate';
import MusicListContainer from '../../container/MusicListContainer';
import SearchBarContainer from '../../container/SearchBarContainer';

const Main = () => <PageTemplate search={<SearchBarContainer />} list={<MusicListContainer />} />;

export default Main;
