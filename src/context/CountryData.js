import React, { createContext, useEffect, useState, useContext } from 'react';

import api_country from '../services/api_country'

const CountryContext = createContext();

export default function CountryProvider({ children }) {
    const [country, setCountry] = useState({})

    useEffect(() => {
      api_country.get('/').then(response => {

            response.data = JSON.parse(JSON.stringify(response.data, function(a, b) {
            return typeof b === "string" ? b.toLowerCase() : b
          }))
          setCountry(response.data)
      })
    }, [])

  return (
    <CountryContext.Provider
      value={{
        country,
        setCountry
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) throw new Error("useCountry must be used within a CountryProvider");
  const { country, setCountry } = context;
  return { country, setCountry };
}