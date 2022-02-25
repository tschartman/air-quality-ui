import { useMemo, useCallback } from 'react'
import { Chart } from 'react-charts'
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
	return (
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes
				}}
			/>
	);
}