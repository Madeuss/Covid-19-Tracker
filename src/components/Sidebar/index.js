import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'

import api from '../../services/api'

import './styles.css'

import img1 from '../../assets/blue-1.png'
import img2 from '../../assets/blue-2.png'
import img3 from '../../assets/blue-3.png'
import img4 from '../../assets/blue-4.png'

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
                <h1>COVID-19</h1>
        
            <Carousel indicators={false} keyboard={false} interval={12000}>
                <Carousel.Item>
                    <img className="d-block w-100" src={img1} alt="Third slide"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={img2} alt="Third slide"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={img3} alt="Third slide"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={img4} alt="Third slide"/>
                </Carousel.Item>
                </Carousel>
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
                            </button>
                            <div className="country-data-hidden" aria-hidden="false">
                                <p>Confirmed: {item.latest.confirmed}</p>
                                <p>Deaths: {item.latest.deaths}</p>
                                <p>Recoveries: {item.latest.recovered}</p>
                            </div>
                        </>
                    )) : (
                    <div>nao entro em uber celta</div> 
                    
                )}
            </div>
        </aside>
    )
}
