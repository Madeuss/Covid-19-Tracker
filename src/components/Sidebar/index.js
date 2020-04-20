import React, { useState, useEffect } from 'react'

/* Format the numbers with comma */
import NumberFormat from 'react-number-format';

/* BOOTSTRAP COMPONENTS */
import Carousel from 'react-bootstrap/Carousel'
import { Accordion, Card } from 'react-bootstrap'

/* REACT ICONS */
import { FaAngleDown, FaMapMarkerAlt} from 'react-icons/fa'
import { GiClick } from 'react-icons/gi'

 /* useContext */
import { useData } from "../../context/ApiData"

import api_recovered from '../../services/api_recovered'

import './styles.css'

import virus from '../../assets/virus.svg'

/* WHO ADVICES CAROUSEL IMAGES */
import img1 from '../../assets/blue-1.png'
import img2 from '../../assets/blue-2.png'
import img3 from '../../assets/blue-3.png'
import img4 from '../../assets/blue-4.png'

export default function Sidebar() {
	const { data } = useData({});

	const [dataDefault, setDataDefault] = useState([])

	const [filter, setFilter] = useState('')
	const [info, setInfo] = useState([])

	useEffect(() => {
		(async function loadDefaultData() {
			const response = await api_recovered.get('/recovered');

			response.data = JSON.parse(JSON.stringify(response.data, function(a, b) {
				return typeof b === "string" ? b.toLowerCase() : b
			  }))
			console.log(response.data.slice(0, 50));
			setDataDefault(response.data.slice(0, 50));
		})()
	}, [])

	async function handleFilter(e) {
	  e.preventDefault();

	  const filter_name = filter

	  try {
		  await api_recovered.get(`/${filter_name}`)
		  .then(response => {

			response.data = JSON.parse(JSON.stringify(response.data, function(a, b) {
				return typeof b === "string" ? b.toLowerCase() : b
			})) 
			console.log(response.data.slice(0, 50))
			setInfo(response.data.slice(0, 50))
		  })
	  }
	  catch (err) {
		  alert('Search Error!')
	  }
	}

	const getTitleFromFilter = filter_name => {
		if (filter_name === 'confirmed'){
			return 'total confirmed incidents'
		}
		if (filter_name === 'deaths' ){
			return 'total deaths incidents'
		}
		if (filter_name === 'recovered' ){
			return 'total recovered incidents'
		}
		return 'total recovered incidents'
	}

	const getDataFromFilter = filter_name => {

		// if (filter_name === 'confirmed'){
		// 	{info.map(item => {
		// 			console.log(item.confirmed.toString().slice(0, 1))
		// 		}
		// 	)}
		// }
		// if (filter_name === 'deaths' ){
		// 	{info.map(item =>
		// 		{console.log(item.deaths)}
		// 	 )}
			 
		// }
		// if (filter_name === 'recovered' ){
		// 	{info.map(item =>
		// 		{return item.recovered}
		// 	 )}
		// }
		return 'nao deu certo fodase'
	}

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
					<h3>World Incidents</h3>
					<span><p>Click below to filter by <br />top 50 countries</p><GiClick /></span>
				</div>
		
				{ data.confirmed? (
				<div className="total-incidents-data" key={data.confirmed}>
					<form className="button" onSubmit={handleFilter} >
						<button className="btn-filter" id="btn-confirmed" type="submit" value="confirmed" onClick={e => setFilter(e.target.value)}>
							<NumberFormat value={data.confirmed.value} displayType={'text'} thousandSeparator={true} renderText={value => <>{value}</>} />
							<br />Confirmed
						</button>
					</form>  
					<form className="button" onSubmit={handleFilter} >
						<button className="btn-filter" id="btn-deaths" idtype="submit" value="deaths" onClick={e => setFilter(e.target.value)}>
							<NumberFormat value={data.deaths.value} displayType={'text'} thousandSeparator={true} renderText={value => <>{value}</>} />
							<br />Deaths
						</button>
					</form>   
					<form className="button" onSubmit={handleFilter} >
						<button autoFocus className="btn-filter" id="btn-recov" type="submit" value="recovered" onClick={e => setFilter(e.target.value)}>
							<NumberFormat value={data.recovered.value} displayType={'text'} thousandSeparator={true} renderText={value => <>{value}</>} />
							<br />Recoveries
						</button>
					</form>  
				</div>
				) : (
				<div key={data}></div> 
				)} 
			</section>
			
			{/* COUNTRIES DATA */}
			<div className="country-incidents-data">
				{ info.length ? (
					info.map(item => 
						<div key={item.provinceState + item.incidentRate + item.combinedKey} className="dropdown">
							<Accordion className="card-country">
								<Card className="card-country">
									<Card.Header>
										<Accordion.Toggle variant="link" eventKey="0" className="each-country-btn">
											<h4>{item.countryRegion} {item.provinceState}</h4>
											<NumberFormat value={getDataFromFilter(filter)} displayType={'text'} thousandSeparator={true} 
												renderText={value => 
													<span className="span-total-incidents"> 
														<p>{getTitleFromFilter(filter)}</p>
														<p>{value}<FaAngleDown id="angledown-icon" /></p> 
													</span>
												} 
											/>       
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body className="dropdown-content">
											<span><FaMapMarkerAlt /><p>{item.iso2}</p></span>
											<img src={`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${item.iso2}/128.png`} alt={item.countryRegion}/>
											<div className="dropdown-data">
												<NumberFormat value={item.confirmed} displayType={'text'} thousandSeparator={true} 
													renderText={value => 
														<p>Confirmed: {value}</p> 
													} 
												/>
												<NumberFormat value={item.deaths} displayType={'text'} thousandSeparator={true} 
													renderText={value => 
														<p>Deaths: {value}</p> 
													} 
												/>
												<NumberFormat value={item.recovered} displayType={'text'} thousandSeparator={true} 
													renderText={value => 
														<p>Recoveries: {value}</p> 
													} 
												/>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</div>
					)) : (
						dataDefault.map(item => 
							<div key={item.provinceState + item.incidentRate + item.combinedKey} className="dropdown">
								<Accordion className="card-country">
									<Card className="card-country">
										<Card.Header>
											<Accordion.Toggle variant="link" eventKey="0" className="each-country-btn">
												<h4>{item.countryRegion} {item.provinceState}</h4>
												<NumberFormat value={item.recovered} displayType={'text'} thousandSeparator={true} 
													renderText={value => 
														<span className="span-total-incidents"> 
															<p>total recovered incidents</p>
															<p>{value}<FaAngleDown id="angledown-icon" /></p> 
														</span>
													} 
												/>       
											</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey="0">
											<Card.Body className="dropdown-content">
												<span><FaMapMarkerAlt /><p>{item.iso2}</p></span>
												<img src={`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${item.iso2}/128.png`} alt={item.countryRegion}/>
												<div className="dropdown-data">
													<NumberFormat value={item.confirmed} displayType={'text'} thousandSeparator={true} 
														renderText={value => 
															<p>Confirmed: {value}</p> 
														} 
													/>
													<NumberFormat value={item.deaths} displayType={'text'} thousandSeparator={true} 
														renderText={value => 
															<p>Deaths: {value}</p> 
														} 
													/>
													<NumberFormat value={item.recovered} displayType={'text'} thousandSeparator={true} 
														renderText={value => 
															<p>Recoveries: {value}</p> 
														} 
													/>
												</div>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							</div>
						)
				)}
			</div>
		</aside>
	)
}
