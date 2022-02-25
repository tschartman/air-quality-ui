import {useState} from 'react';
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MeasurementsChart from '../../components/Measurements/MeasurementsChart';
import MeasurementsTable from '../../components/Measurements/MeasurementsTable';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import dateFormat, { masks } from "dateformat";

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

const classes = {
    title: {
        textAlign: 'center',
        marginLeft: '-95px'
    },
    subtitle: {
        textAlign: 'center',
    }
}

export default function Measurements(props) {
    const {measurements, loading} = useSelector((state) => state.measurements)
    const navigate = useNavigate()
		const [dataView, setDataView] = useState('graph')

		const handleDataViewChange = (event, newDataView) => {
			setDataView(newDataView);
		}

    const styles = {
        chartContainer: {
            width: '100%',
            height: '70vh',
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
        }
    }

    const getChart = () => {
        return loading ?
        (
            <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: '100%',
                height: '100%'
            }}>
                <CircularProgress style={{padding: "100px"}} size={100} />
            </Box>
        ) : 
        measurements.length > 0 ?  
        (
            <div>
                <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'center',

                }}>
                <h2>{measurements[0].location}</h2>
                </Box>

                <div style={styles.chartContainer}>
                 {dataView === 'graph' ? 
								 <MeasurementsChart measurements={measurements}/> :
								 <MeasurementsTable measurements={measurements}/>
								}
                </div>
            </div>
        ) : null
    }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    borderRadius: 1,
                }}
            >
                <div style={{
                    padding: '15px'
                    }}>
                    <ArrowBackIcon sx={{ fontSize: 80 }} style={{color: '#3f444a', cursor: 'pointer'}} onClick={() => {navigate('/')}}/>
                </div>
                <Item>
                    <h1 style={classes.title}>Measurements</h1>
                </Item>
                <Item>
								</Item>
            </Box>
						<Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
										mt: '-30px'
                }}
            >
																	<ToggleButtonGroup
											color="primary"
											value={dataView}
											exclusive
											onChange={handleDataViewChange}
										>
											<ToggleButton value="graph">Graph</ToggleButton>
											<ToggleButton value="table">Table</ToggleButton>
										</ToggleButtonGroup>
							</Box>
            {getChart()}
        </div>
    )
}