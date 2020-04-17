import React, { useState, useRef } from 'react';
import { Overlay, Button } from 'react-bootstrap'

/* REACT ICONS */
import { FiMap } from 'react-icons/fi';
import { FaMapMarkerAlt, FaAngleRight } from 'react-icons/fa';

import './styles.css';

export default function Search() {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
      <div className="map-info">
        <Button className="btn-info" variant="dark" ref={target} onClick={() => setShow(!show)}>
          <span><FiMap /></span>
        </Button>
        <Overlay className="overlay-info" target={target.current} show={show} placement="left">
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
                margin: '5px 4px 0 0',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
             <span className="info-title"><p>Marker</p><p>Confirmed Incidents</p></span> <br />
              <div className="info">
                <span><FaMapMarkerAlt color={'rgb(228, 71, 71)'}/><p><FaAngleRight />100.000</p></span><br />
                <span><FaMapMarkerAlt color={'rgb(000, 010, 200)'}/><p><FaAngleRight />30.000</p></span><br />
                <span><FaMapMarkerAlt color={'rgb(000, 100, 255)'}/><p><FaAngleRight />10.000</p></span><br />
                <span><FaMapMarkerAlt color={'rgb(000, 180, 255)'}/><p><FaAngleRight />1.000</p></span><br />
                <span><FaMapMarkerAlt color={'grey'}/><p>Less</p></span><br />
              </div>
            </div>
          )}
        </Overlay>
      </div>
    );
  }
  
