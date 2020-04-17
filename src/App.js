import React from 'react';

import Routes from './routes'

import DataProvider from "./context/ApiData";

function App() {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
}

export default App;
