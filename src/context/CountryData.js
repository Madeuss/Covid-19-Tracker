import React, { createContext, useEffect, useState, useContext } from 'react';

import api from '../services/api'

const CountryContext = createContext();

export default function CountryProvider({ children }) {
    const [country, setCountry] = useState({})

    async function handleTrackCovid(e) {
        e.preventDefault();

        const country_name = country

        try {
            await api.get('/', {
                params: {
                    country: `${country_name}`,
                }
            }).then(response => {
                console.log(response.data)
            })
        }
        catch (err) {
            alert('Search Error! Check the country name or the country ID')
        }
    }

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