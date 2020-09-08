import React, { useState, useContext, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DateContext from "./context/DateContext";
import TextField from "./TextField/TextField";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

export default function CustomizedTables() {
	const classes = useStyles();
	const date = useContext(DateContext);
	// const [daysInMonthArray, setDaysInMonthArray] = useState(
	// 	getDaysInMonthArray(date.state.monthLength)
	// );
	// useEffect(() => {
	// 	// console.log(selectedMonth, selectedYear);

	// 	setDaysInMonthArray(getDaysInMonthArray(date.state.monthLength));
	// 	// console.log(daysInMonth);
	// }, [date.state.monthLength]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Date</StyledTableCell>
						<StyledTableCell align="center">Regular</StyledTableCell>
						<StyledTableCell align="center">Mid</StyledTableCell>
						<StyledTableCell align="center">Premium</StyledTableCell>
						{/* <StyledTableCell align="right">Total</StyledTableCell> */}
						<StyledTableCell align="center">Delivery</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{date.state.daysInMonthArray.map((day, index) => (
						<StyledTableRow key={index}>
							<StyledTableCell component="th" scope="row">
								{date.state.month}/{day}/{date.state.year}
							</StyledTableCell>
							<StyledTableCell align="right">
								<TextField cName={"regular-" + (index + 1)} />
							</StyledTableCell>
							<StyledTableCell align="right">
								<TextField cName={"mid-" + (index + 1)} />
							</StyledTableCell>
							<StyledTableCell align="right">
								<TextField cName={"premium-" + (index + 1)} />
							</StyledTableCell>
							{/* <StyledTableCell align="right">{day}</StyledTableCell> */}
							<StyledTableCell align="right">
								<TextField cName={"delivery-" + (index + 1)} />
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
