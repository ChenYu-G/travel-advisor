import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api/index'

const App = () => {
	const [places, setPlaces] = useState([])
	const [coordinates, setCoordinates] = useState({})
	const [bounds, setBounds] = useState({})
	const [childClicked, setChildClicked] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [filteredPlaces, setFilteredPlaces] = useState([])
	const [type, setType] = useState('restaurants')
	const [rating, setRating] = useState('')

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude })
			}
		)
	}, [])

	useEffect(() => {
		const filtered = places.filter((place) => {
			place.rating > rating
		})
		setFilteredPlaces(filtered)
	}, [rating])

	useEffect(
		() => {
			const timer = setTimeout(() => {
				setIsLoading(true)
				getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
					setPlaces(data)
					setIsLoading(false)
					setRating('')
					console.log(data)
				})
			}, 1000)

			return () => {
				clearTimeout(timer)
			}
		},

		[type, coordinates]
		// [coordinates, bounds]
	)

	return (
		<>
			<CssBaseline>
				<Header setCoordinates={setCoordinates} />
				<Grid container spacing={3} style={{ width: '100%' }}>
					<Grid item xs={12} md={4}>
						<List
							places={filteredPlaces.length ? filteredPlaces : places}
							childClicked={childClicked}
							isLoading={isLoading}
							type={type}
							setType={setType}
							rating={rating}
							setRating={setRating}
						/>
					</Grid>
					<Grid item xs={12} md={8}>
						<Map
							setBounds={setBounds}
							setCoordinates={setCoordinates}
							coordinates={coordinates}
							places={filteredPlaces.length ? filteredPlaces : places}
							setChildClicked={setChildClicked}
						/>
					</Grid>
				</Grid>
			</CssBaseline>
		</>
	)
}

export default App
