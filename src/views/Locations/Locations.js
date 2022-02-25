import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getLocations } from '../../store/locations/locationsSlice';
import Location from '../../components/Location/Location.component';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Locations() {
	const dispatch = useDispatch()
	const {locations, loading} = useSelector((state) => state.locations)
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [entity, setEntity] = useState('government')
	const handlePageChange = (event, newPage) => {
	  setPage(newPage);
	};
  
	const handleItemsPerPageChange = (event) => {
		setItemsPerPage(event.target.value)
	}

	const handleFilterChange = (event, newFilter) => {
		setEntity(newFilter)
	}

	useEffect(() => {
		dispatch(getLocations(entity))
	}, [entity])

	const classes = {
		title: {
			textAlign: 'center'
		}
	}

	return (
		<div>
			<h1 style={classes.title}>Locations - US</h1>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
			<ToggleButtonGroup
				color="primary"
				value={entity}
				exclusive
				onChange={handleFilterChange}
			>
				<ToggleButton value="government">Government</ToggleButton>
				<ToggleButton value="research">Research</ToggleButton>
				<ToggleButton value="community">Community</ToggleButton>
			</ToggleButtonGroup>
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					height: '70vh',
					overflow: 'auto',
					backgroundColor: '#E0ECF9',
					p: 1,
					m: 3,
					borderRadius: 1,
				}}
			>
				
			{
			locations.length > 0 ?
			locations.slice(page, page + itemsPerPage).map((location) => (
				<Location location={location}></Location>
			)) :
			<h1>No Locations Found</h1>
			}
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
			<Pagination count={locations.length / itemsPerPage} onChange={handlePageChange} page={page} variant="outlined" shape="rounded" />
			<Box>
				<FormControl variant="standard" sx={{ ml: 2 }}>
					<Select
							labelId="simple-select-label"
							id="simple-select"
							value={itemsPerPage}
							label="Items Per Page"
							onChange={handleItemsPerPageChange}
						>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={25}>25</MenuItem>
							<MenuItem value={50}>50</MenuItem>
							<MenuItem value={100}>100</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Box>
		</div>
	);
}