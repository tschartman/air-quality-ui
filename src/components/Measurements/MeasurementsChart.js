import { useMemo, useCallback } from 'react'
import { Chart } from 'react-charts'
import Box from '@mui/material/Box';

export default function MeasurementsChart(props) {
	const data = [
		{
			label: 'value',
			data: [
				...props.measurements
			],
		},
	]

	const primaryAxis = useMemo(
		() => ({
			getValue: datum => new Date(`${datum.date.local}`),
		}),
		[]
	)

	const secondaryAxes = useMemo(
		() => [
			{
				getValue: datum => datum.value,
			},
		],
		[]
	)

	const styles = {
		table: {
			backgroundColor: '#BECDDE',
			width: '90%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignContent: 'center',
		}
	}

	return (
		<Box style={styles.table}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes
				}}
			/>
		</Box>
	);
}