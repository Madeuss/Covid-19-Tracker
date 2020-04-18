import React from 'react'

/* Format the numbers with comma */
import NumberFormat from 'react-number-format';

/* BOOTSTRAP COMPONENTS */
import Carousel from 'react-bootstrap/Carousel'
import { Accordion, Card } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

/* REACT ICONS */
import { FaAngleDown, FaMapMarkerAlt} from 'react-icons/fa';

 /* useContext */
import { useData } from "../../context/ApiData";
import { useCountry } from "../../context/CountryData";

import './styles.css'

import virus from '../../assets/virus.svg'

/* WHO ADVICES CAROUSEL IMAGES */
import img1 from '../../assets/blue-1.png'
import img2 from '../../assets/blue-2.png'
import img3 from '../../assets/blue-3.png'
import img4 from '../../assets/blue-4.png'


export default function Sidebar() {
    const { data } = useData({});
    const { country } = useCountry({});

    return (
        <aside className="aside-data data-group" >
            <section className="covid-info">
                <h1>C<span className="virus-ico"><img src={virus} alt="covid-19" /></span>VID-19 INCIDENTS</h1>
        
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

             {/* WORLD DATA INCIDENTS */}
            <section className="world-incidents">
                <div className="world-data-title">
                    <h3>World</h3>
                </div>
        
                { data.confirmed? (
                <div className="total-incidents-data" key={data.confirmed}>
                    <button type="button" className="button" id="btn-confirmed">
                    <NumberFormat value={data.confirmed.value} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        <p>Confirmed</p>
                    </button>   
                    <button type="button" className="button" id="btn-deaths">
                    <NumberFormat value={data.deaths.value} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        <p>Deaths</p>
                    </button> 
                    <button type="button" className="button" id="btn-recov">
                    <NumberFormat value={data.recovered.value} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        <p>Recoveries</p>
                    </button> 
                        
                </div>
                ) : (
                <div key={data.latest}></div> 
                )} 
            </section>
            
            {/* COUNTRIES DATA */}
            <div className="country-incidents-data">
                { country.locations? (
                    country.locations.map(item => 
                        <div key={item.id} className="dropdown">
                            <Accordion className="card-country">
                                <Card className="card-country">
                                    <Card.Header>
                                        <Accordion.Toggle variant="link" eventKey="0" className="each-country-btn">
                                            <h4>{item.country} {item.province}</h4>
                                            <p>{item.latest.confirmed}<FaAngleDown id="angledown-icon" /></p>        
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body className="dropdown-content">
                                            <span><FaMapMarkerAlt /><p>{item.country_code}</p></span>
                                            <img src={`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${item.country_code}/128.png`} alt={item.country}/>
                                            <div className="dropdown-data">
                                                <p>Confirmed: {item.latest.confirmed}</p>
                                                <p>Deaths: {item.latest.deaths}</p>
                                                <p>Recoveries: {item.latest.recovered}</p>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    )) : (
                        <Spinner className="loading-spinner" animation="border" role="status" variant="info">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                )}
            </div>
        </aside>
    )
}
