import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import './styles.css'

export default function Sidebar() {
    const [incidents, setIncidents] = useState({})

    useEffect(() => {
            api.get('/').then(response => {
                console.log(response.data)
                setIncidents(response.data)
            })
    }, [])

    return (
        <aside className="aside-data data-group" >
            <section className="covid-info">
                <h1>COVID 19</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda nulla dolore adipisci corrupti fuga aspernatur quod a modi, deserunt sunt pariatur eveniet, illo perferendis expedita praesentium qui dolorem repellendus? Nulla. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, velit minima aperiam exercitationem molestias, beatae quibusdam earum ipsam inventore maxime sequi quisquam vitae dicta commodi dignissimos rerum quia laborum laudantium?</p>
            </section>

            <div className="total-incidents-data">
                { incidents.latest? (
                <>
                    <button type="button" className="button" id="btn-confirmed">
                        {incidents.latest.confirmed}
                        <p>Confirmed</p>
                    </button>   
                    <button type="button" className="button" id="btn-deaths">
                        {incidents.latest.deaths}
                        <p>Deaths</p>
                    </button> 
                    <button type="button" className="button" id="btn-recov">
                        {incidents.latest.recovered}
                        <p>Recoveries</p>
                    </button> 
                        
                </>
                ) : (
                <div></div> 
                )} 
            </div>

            {/* Country name/province and incidents */}
            <div className="country-incidents-data">
                { incidents.locations? (
                    incidents.locations.map(item => 
                        <>
                            <button type="button" className="each-country-btn">
                                <h4>{item.country} {item.province}</h4>
                                <p>{item.latest.confirmed}</p>
                            
                                <div className="country-data-hidden data-country" aria-hidden="false">
                                    <p>Confirmed: {item.latest.confirmed}</p>
                                    <p>Deaths: {item.latest.deaths}</p>
                                    <p>Recoveries: {item.latest.recovered}</p>
                                </div>
                            </button>
                        </>
                    )) : (
                    <div>nao entro em uber celta</div> 
                )}
            </div>
        </aside>
    )
}
