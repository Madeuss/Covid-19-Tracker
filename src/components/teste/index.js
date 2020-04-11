import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function CountryData() {

    const dataCountry = useSelector(state => state.data);
    const dispatch = useDispatch()

    function loadData() {
        dispatch({ type: 'LOAD_DATA', payload: dataCountry })
    }

    return (
        <>
            <ul>
                { dataCountry.map(each => 
                    <li key={dataCountry}>
                        fodase
                    </li>    
                )}
            </ul>
            <button type="button" onClick={loadData}>
                Adicionar curso
            </button>
        </>
    )
}
