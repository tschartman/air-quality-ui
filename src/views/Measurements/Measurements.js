import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MeasurementsChart from '../../components/Measurements/MeasurementsChart';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';


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
        marginLeft: '-80px'
    },
    subtitle: {
        textAlign: 'center',
    }
}

export default function Measurements(props) {
    const {measurements, loading} = useSelector((state) => state.measurements)
    const navigate = useNavigate()

    const styles = {
        chartContainer: {
            width: '100%',
            height: '80vh',
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
                    <MeasurementsChart measurements={measurements}/>
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
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        cursor: 'pointer'
                    }}>
                    <ArrowBackIcon sx={{ fontSize: 80 }} style={{color: '#3f444a'}} onClick={() => {navigate('/')}}/>
                </div>
                <Item>
                    <h1 style={classes.title}>Measurements</h1>
                </Item>
                <Item></Item>
            </Box>
            {getChart()}
        </div>
    )
}