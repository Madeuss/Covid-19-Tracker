import React from 'react'

import { Link } from 'react-router-dom'

/* Format the numbers with comma */
import NumberFormat from 'react-number-format';

/* BOOTSTRAP COMPONENTS */
import Carousel from 'react-bootstrap/Carousel'
import { FaAngleDown, FaBeer } from 'react-icons/fa';

 /* useContext */
import { useData } from "../../context/ApiData";
import { useCountry } from "../../context/CountryData";

import './styles.css'

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
                        <div key={country.locations.id} className="dropdown">
                            <button type="button" className="each-country-btn">
                                <h4>{item.country} {item.province}</h4>
                                <p>{item.latest.confirmed} <Link className="linkDrop"><FaAngleDown /></Link></p>
                            </button>
                            <div className="dropdown-content" id="dropfodase">
                                <p>Confirmed: {item.latest.confirmed}</p>
                                <p>Deaths: {item.latest.deaths}</p>
                                <p>Recoveries: {item.latest.recovered}</p>
                            </div>
                        </div>
                    )) : (
                    <div>NÃO ENTRO EM UBER CELTA</div> 
                )}
            </div>
        </aside>
    )
}
