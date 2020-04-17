import React from 'react'

import { useCountry } from "../../context/CountryData";

/* BOOTSTRAP COMPONENTS */
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import './styles.css'

export default function CountryData() {
  const { setCountry } = useCountry({});

  return (
      <section className="search">
        <form className="inputs">
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
  );
}
