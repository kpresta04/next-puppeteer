import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

export default function MaterialUIPickers({
	selectedDate,
	setSelectedDate,
	selectedMonth,
	selectedYear,
	setSelectedMonth,
	setSelectedYear,
}) {
	// The first commit of Material-UI

	const handleDateChange = (date) => {
		selectedDate(date);
		setSelectedMonth(moment(date).format("MM"));
		setSelectedYear(moment(date).format("YYYY"));
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					format="MM/yyyy"
					margin="normal"
					id="date-picker-inline"
					label="Month"
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
}
