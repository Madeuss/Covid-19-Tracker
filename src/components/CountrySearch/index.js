import React, { useState, useRef } from 'react';

/* BOOTSTRAP COMPONENTS */
import { Overlay, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

/* Format the numbers with comma */
import NumberFormat from 'react-number-format';

/* REACT ICONS */
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

import worldsick from '../../assets/worldsick.svg'

import './styles.css';

import api_recovered from '../../services/api_recovered'

export default function Search() {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const [country, setCountry] = useState('')
	  const [data, setData] = useState([])

    async function handleConsultCountry(e) {
      e.preventDefault();

      const country_name = country

      try {
          await api_recovered.get(`/countries/${country_name}/confirmed`)
          .then(response => {
			console.log(response.data.slice(0, 10))
			setData(response.data.slice(0, 10))
          })
      }
      catch (err) {
          alert('Search Error! Check the country name')
      }
    }

    return (
      <div className="country-search">
        <Button className="btn-search" variant="dark" ref={target} onClick={() => setShow(!show)}>
          <span><FaSearch /></span>
        </Button>
        <Overlay className="overlay-search" target={target.current} show={show} placement="left">
          {({
            placement,
            scheduleUpdate,
            arrowProps,
            outOfBoundaries,
            show: _show,
            ...props
          }) => (
            <div className="overlay overlay-search"
              {...props}
              style={{
                padding: '5px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
                <span className="search-title"><h3>Track By Country</h3> <img src={worldsick} alt="World Sick" /></span> <br />
                <section className="search">
                  <form className="inputs" autoComplete="off" onSubmit={handleConsultCountry}>
                    <Form.Row className="form-row">
                      <Form.Label column="lg" lg={0} className="form-label">
                        Country:
                      </Form.Label>
                      <Col id="input-col-1" className="input-col" >
                        <input autoComplete="off" autoFocus value={country} onChange={e => setCountry(e.target.value)} id="city-name" size="lg" type="text" placeholder="Country Name" />
                      </Col>
                    </Form.Row>
                    <button className="btn-consult" type="submit">Track</button>
                  </form>
                </section>
                <section className="country-info">
                  { country ? (
                    data.map(item =>
                      <div key={item}>
                        <section className="country-title" key={item}>
                          	<h2 className="title">{item.countryRegion} {item.provinceState}<FaMapMarkerAlt className="icon" /></h2>
                        </section>
                        <section className="flag">
						<img src={`https://www.countries-ofthe-world.com/flags-normal/flag-of-${item.countryRegion}.png`} alt={`${item.countryRegion} flag`}></img>
						</section>
                        <section className="data">
							<NumberFormat value={item.confirmed} displayType={'text'} thousandSeparator={true} 
                                renderText={value => 
                                    <div className="div-data"><p>Confirmed</p> <p>{value}</p></div>
                                } 
                            />
							<NumberFormat value={item.recovered} displayType={'text'} thousandSeparator={true} 
                                renderText={value => 
                                    <div className="div-data"><p>Recoveries</p> <p>{value}</p></div>
                                } 
                            />
							<NumberFormat value={item.active} displayType={'text'} thousandSeparator={true} 
                                renderText={value => 
                                    <div className="div-data"><p>Actives</p> <p>{value}</p></div>
                                } 
                            />
							<NumberFormat value={item.deaths} displayType={'text'} thousandSeparator={true} 
                                renderText={value => 
                                    <div className="div-data"><p>Deaths</p> <p>{value}</p></div>
                                } 
                            />						
                        </section>
                      </div>
                  )) : (
                    <div className="waiting">
						<Spinner className="loading-spinner" animation="grow" role="status" variant="dark">
							<span className="sr-only">Loading...</span>
						</Spinner>
                      <p>Waiting you :)</p>
                    </div>
                  )}
                </section>
              </div>
            )}
        </Overlay>
      </div>
    );
  }
  
