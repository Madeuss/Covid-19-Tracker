import React, { createContext, useEffect, useState, useContext } from 'react';

import api_recovered from '../services/api_recovered'

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData]= useState({});

  useEffect(() => {
    api_recovered.get('/').then(response => {
        setData(response.data)
    })
  }, [])

  return (
    <DataContext.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  const { data, setData } = context;
  return { data, setData };
}