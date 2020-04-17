import React from 'react';

import Routes from './routes'

import DataProvider from "./context/ApiData";
import CountryProvider from "./context/CountryData";

function App() {
  return (
    <DataProvider>
      <CountryProvider>
        <Routes />
      </CountryProvider>
    </DataProvider>
  );
}

export default App;
