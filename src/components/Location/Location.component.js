import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import  { getMeasurements, clearMeasurements } from '../../store/measurements/measurementsSlice';
import dateFormat from "dateformat";

const styles = {
  card: {
    	width: '300px',
		height: '300px',
		backgroundColor: '#becdde',
		color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
		display: 'flex',
		flexDirection: 'column',
  },
  cardActions: {
  }
}

function Item(props) {
	const { sx, ...other } = props;
	return (
		<Box
			sx={{
				m: 1,
				...sx,
			}}
			{...other}
		/>
	);
}

export default function Location(props) {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	return (
		<Item>
			<Card style={styles.card}>
				<CardContent>
					<Typography variant="h5" component="div">
						{props.location.name}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{props.location.entity}
					</Typography>
					<Typography style={{ fontWeight: 600 }} variant="body">
					    Measurements: {props.location.measurements}
						<br />
						<br />
						Sensor Type: {props.location.sensorType}
						<br/>
						<br/>
						Last Updated: {dateFormat(props.location.lastUpdated, 'fullDate')}
					</Typography>
				</CardContent>
				<div style={{ flexGrow: 1}} />
				<CardActions styles={styles.cardActions}>
					<Button size="small" onClick={() => {
						dispatch(clearMeasurements())
						dispatch(getMeasurements(props.location.id))
						navigate('/measurements')}
						}>Learn More</Button>
				</CardActions>
			</Card>
		</Item>
	)
}