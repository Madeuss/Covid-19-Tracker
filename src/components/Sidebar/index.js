import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import './styles.css'

export default function Sidebar() {
    const [incidents, setIncidents] = useState({})

    useEffect(() => {
            api.get('/', {
                params: {
                    country_code: 'br'
                }
            }).then(response => {
                console.log(response.data)
                setIncidents(response.data)
            })
    }, [])

    return (
        <aside className="aside-data">
           <div className="data-group city_country">
                { incidents.locations? (
                    incidents.locations.map(item => 
                    < ul key={item.id}>
                        <h2>{item.country}</h2>
                    </ul>
                    )) : (
                    <div>nao entro em uber celta</div> 
                )}

                { incidents.map(item => (
                    <div>
                        {console.log(item)}
                    </div>
                ))}


            </div>
        </aside>
    )
}
