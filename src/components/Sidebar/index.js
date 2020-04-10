import React, { useState, useEffect } from 'react'

import NumberFormat from 'react-number-format';

/* BOOTSTRAP COMPONENTS */
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'

import api from '../../services/api'

import './styles.css'

import img1 from '../../assets/blue-1.png'
import img2 from '../../assets/blue-2.png'
import img3 from '../../assets/blue-3.png'
import img4 from '../../assets/blue-4.png'


export default function Sidebar() {
    const [incidents, setIncidents] = useState({})
    const [country, setCountry] = useState({})

    useEffect(() => {
            api.get('/').then(response => {
                console.log(response.data)
                setIncidents(response.data)
            })
    }, [])

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
        <aside className="aside-data data-group" >
            <section className="covid-info">
                <h1>COVID-19 INCIDENTS</h1>
        
                <Carousel indicators={false} keyboard={false} interval={12000} className="carousel">
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

            <section className="world-incidents">
                <div className="world-data-title">
                    <h3>World</h3>
                </div>
        
                { incidents.latest? (
                <div className="total-incidents-data">
                    <button type="button" className="button" id="btn-confirmed">
                    <NumberFormat value={incidents.latest.confirmed} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        <p>Confirmed</p>
                    </button>   
                    <button type="button" className="button" id="btn-deaths">
                    <NumberFormat value={incidents.latest.deaths} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        <p>Deaths</p>
                    </button> 
                    <button type="button" className="button" id="btn-recov">
                    <NumberFormat value={incidents.latest.recovered} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        <p>Recoveries</p>
                    </button> 
                        
                </div>
                ) : (
                <div></div> 
                )} 
            </section>

            {/* Country name/province and incidents */}
            <div className="country-incidents-data">
                <section className="search">
                    <form className="inputs" onSubmit={handleTrackCovid}>
                        <Form.Row className="form-row">
                            <Form.Label column="lg" lg={0} className="form-label">
                                Country:
                            </Form.Label>
                            <Col id="input-col-1" className="input-col" >
                                <input onChange={e => setCountry(e.target.value)} id="city-name" size="lg" type="text" placeholder="Country Name" />
                            </Col>
                        </Form.Row>
                        <button className="btn-consult" type="submit">Track</button>
                    </form>
                </section>
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
