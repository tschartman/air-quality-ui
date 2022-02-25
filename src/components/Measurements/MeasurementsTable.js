import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import dateFormat from "dateformat";

const columns = [
	{id: 'fulldate', label: 'Date'},
  { id: 'time', label: 'Time' },
  {
		id: 'parameter',
		label: 'Parameter',
		minWidth: 170,
		format: (value) => value.toLocaleString('en-US'),
  },
  {
		id: 'value',
		label: 'Value',
		minWidth: 170,
		format: (value) => value.toFixed(2),
  },
];

function createData({value, date, parameter}) {
	const parsedDate = new Date(date.local)
	const time = dateFormat(parsedDate, "h:MM", true);
	const fulldate = dateFormat(parsedDate, 'fullDate')
  return { value, parameter, fulldate, time};
}


export default function MeasurementsTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.measurements.map(measurement => createData(measurement))
  
  const handleChangePage = (event, newPage) => {
		setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
  };

  const styles = {
	  table: {
		  backgroundColor: '#BECDDE',
			width: '90%',
			height: '58vh'
	  }
  }

  return (
	<Box sx={{ 
		display: 'flex',
		justifyContent: 'center',
		width: '90%'
	}}>
		<Paper style={styles.table} sx={{ overflow: 'hidden' }}>
		<TableContainer  sx={{ maxHeight: '50vh' }}>
			<Table stickyHeader aria-label="sticky table">
			<TableHead>
				<TableRow>
				{columns.map((column) => (
					<TableCell
					key={column.id}
					align={column.align}
					style={{ minWidth: column.minWidth, backgroundColor: '#A9B6C5' }}
					>
					{column.label}
					</TableCell>
				))}
				</TableRow>
			</TableHead>
			<TableBody>
				{rows
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((row) => {
					return (
					<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
						{columns.map((column) => {
						const value = row[column.id];
						return (
							<TableCell key={column.id} align={column.align}>
							{column.format && typeof value === 'number'
								? column.format(value)
								: value}
							</TableCell>
						);
						})}
					</TableRow>
					);
				})}
			</TableBody>
			</Table>
		</TableContainer>
		<TablePagination
			rowsPerPageOptions={[10, 25, 100]}
			component="div"
			count={rows.length}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
		</Paper>
	</Box>
  );
}