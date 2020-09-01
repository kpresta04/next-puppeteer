import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function SimpleSelect({
	defaultMonth,
	defaultYear,
	selectedMonth,
	setSelectedMonth,
	selectedYear,
	setSelectedYear,
}) {
	const classes = useStyles();

	const handleChangeMonth = (event) => {
		setSelectedMonth(event.target.value);
	};
	const handleChangeYear = (event) => {
		setSelectedYear(event.target.value);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">Month</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					className="demo-simple-select"
					value={selectedMonth}
					onChange={handleChangeMonth}
				>
					<MenuItem value={1}>Jan</MenuItem>
					<MenuItem value={2}>Feb</MenuItem>
					<MenuItem value={3}>Mar</MenuItem>
					<MenuItem value={4}>Apr</MenuItem>
					<MenuItem value={5}>May</MenuItem>
					<MenuItem value={6}>Jun</MenuItem>
					<MenuItem value={7}>Jul</MenuItem>
					<MenuItem value={8}>Aug</MenuItem>
					<MenuItem value={9}>Sep</MenuItem>
					<MenuItem value={10}>Oct</MenuItem>
					<MenuItem value={11}>Nov</MenuItem>
					<MenuItem value={12}>Dec</MenuItem>
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label-year">Year</InputLabel>
				<Select
					labelId="demo-simple-select-label-year"
					className="demo-simple-select"
					value={selectedYear}
					onChange={handleChangeYear}
				>
					<MenuItem value={defaultYear - 1}>{defaultYear - 1}</MenuItem>
					<MenuItem value={defaultYear}>{defaultYear}</MenuItem>
					<MenuItem value={defaultYear + 1}>{defaultYear + 1}</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
