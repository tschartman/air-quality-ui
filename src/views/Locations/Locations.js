import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getLocations } from '../../store/locations/locationsSlice';
import Location from '../../components/Location/Location.component';
import Box from '@mui/material/Box';
export default function Locations() {
	const dispatch = useDispatch()
	const {locations, loading} = useSelector((state) => state.locations)

	useEffect(() => {
		dispatch(getLocations())
	}, [])

	const classes = {
		title: {
			textAlign: 'center'
		}
	}

	return (
		<div>
			<h1 style={classes.title}>Locations</h1>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					p: 1,
					m: 3,
					borderRadius: 1,
				}}
			>
			{locations.map((location) => (
				<Location location={location}></Location>
			))}
			</Box>
		</div>
	);
}