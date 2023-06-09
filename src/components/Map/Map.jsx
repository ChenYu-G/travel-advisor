import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles.js'
import mapStyle from './mapStyle.js'

const Map = ({
	setCoordinates,
	setBounds,
	coordinates,
	places,
	setChildClicked,
}) => {
	const isDesktop = useMediaQuery('(min-width:600px)')
	const classes = useStyles()

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyDpgjN2xsZvFFwR8QKE3YXE23DnYKLmEjM' }}
				defaultCenter={{ lat: 10, lng: 10 }}
				center={coordinates}
				defaultZoom={14}
				options={{
					disableDefaultUI: true,
					zoomControl: true,
					styles: mapStyle,
				}}
				margin={[50, 50, 50, 50]}
				onChange={(e) => {
					setCoordinates({ lat: e.center.lat, lng: e.center.lng })
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
				}}
				onChildClick={(child) => {
					setChildClicked(child)
				}}
				places={places}
			>
				{places?.map((place, i) => (
					<div
						className={classes.markerContainer}
						lat={Number(place.latitude)}
						lng={Number(place.longitude)}
						key={i}
					>
						{!isDesktop ? (
							<LocationOnOutlinedIcon color='primary' fontSize='large' />
						) : (
							<Paper elevation={3} className={classes.paper}>
								<Typography
									className={classes.typography}
									variant='subtitle2'
									gutterBottom
								>
									{' '}
									{place.name}
								</Typography>
								<img
									className={classes.pointer}
									src={
										place.photo
											? place.photo.images.large.url
											: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80'
									}
								/>
								<Rating
									name='read-only'
									size='small'
									value={Number(place.rating)}
									readOnly
								/>
							</Paper>
						)}
					</div>
				))}
			</GoogleMapReact>
		</div>
	)
}

export default Map
