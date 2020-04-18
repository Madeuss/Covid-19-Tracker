import React, { useState, useRef } from 'react';

/* BOOTSTRAP COMPONENTS */
import { Overlay, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

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

			response.data = JSON.parse(JSON.stringify(response.data, function(a, b) {
				return typeof b === "string" ? b.toLowerCase() : b
			  }))
			setData(response.data)
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
            <div className="overlay"
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
                  <form className="inputs" onSubmit={handleConsultCountry}>
                    <Form.Row className="form-row">
                      <Form.Label column="lg" lg={0} className="form-label">
                        Country:
                      </Form.Label>
                      <Col id="input-col-1" className="input-col" >
                        <input value={country} onChange={e => setCountry(e.target.value)} id="city-name" size="lg" type="text" placeholder="Country Name" />
                      </Col>
                    </Form.Row>
                    <button className="btn-consult" type="submit">Track</button>
                  </form>
                </section>
                <section className="country-info">
                  {data ? (
                    data.map(item =>
                      <>
                        <section className="country-title" key={item}>
                          	<h2 className="title">{item.countryRegion} {item.provinceState}<FaMapMarkerAlt className="icon" /></h2>
                        </section>
                        <section className="flag">
                        	<img src={`https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${item.iso3.toLowerCase().substring(0,2)}.png`} alt={`${item.countryRegion} flag`}></img>
						</section>
                        <section className="data">
							<div className="div-data"><p>Confirmed</p> <p>{item.confirmed}</p></div>
							<div className="div-data"><p>Recoveries</p> <p>{item.recovered}</p></div>
							<div className="div-data"><p>Actives</p> <p>{item.active}</p></div>
							<div className="div-data"><p>Deaths</p> <p>{item.deaths}</p></div>
                        </section>
                      </>
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
  
