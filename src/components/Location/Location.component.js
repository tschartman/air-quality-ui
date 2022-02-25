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

const styles = {
  card: {
    width: '300px',
		height: '185px',
		backgroundColor: '#becdde',
		color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
  },
}

function Item(props) {
	const { sx, ...other } = props;
	return (
		<Box
			sx={{
				m: 1,
				alignContent: 'center',
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
					<Typography variant="body2">
						Measurements: {props.location.measurements}
						<br />
						Sensor Type: {props.location.sensorType}
					</Typography>
				</CardContent>
				<CardActions styles={{display: 'flex', justify: 'center'}}>
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