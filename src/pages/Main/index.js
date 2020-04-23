import React from 'react';

import './styles.css';

import Sidebar from '../../components/Sidebar'
import MapBox from '../../components/MapBox'
import MapInfo from '../../components/MapInfo'
import Search from '../../components/CountrySearch'
// import Teste from '../../components/Teste'
export default function Main() {
  return (
    <div className="body">
        <Sidebar />
        <MapInfo />
        <MapBox />
        <Search />
    </div>
  );
}
