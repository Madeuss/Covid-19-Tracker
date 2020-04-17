import React, { useState, useRef } from 'react';
import { Overlay, Button } from 'react-bootstrap'

/* REACT ICONS */
import { FaAlignJustify } from 'react-icons/fa';

import './styles.css';

export default function MapInfo() {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
      <div className="map-info">
        <Button className="btn-info" variant="dark" ref={target} onClick={() => setShow(!show)}>
          <span><FaAlignJustify /></span>
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
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Simple tooltip<br />
              Simple tooltip<br />
              Simple tooltip<br />
              Simple tooltip<br />
              Simple tooltip<br />
              
            </div>
          )}
        </Overlay>
      </div>
    );
  }
  
