import React, { useReducer } from "react";
import moment from "moment";

const defaultMonth = Number(moment().format("MM")) - 1;
const defaultYear = Number(moment().format("YYYY"));
const defaultMonthLength = moment(
	`${defaultYear}-${defaultMonth}`,
	"YYYY-MM"
).daysInMonth();
const DateContext = React.createContext({});

const reducer = (state, action) => {
	switch (action.type) {
		case "INCREASE":
			return state + 1;
		case "DECREASE":
			return state - 1;
		case "INCREASE_BY":
			return state + action.payload;
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

export const DateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		month: defaultMonth,
		year: defaultYear,
		monthLength: defaultMonthLength,
	});
	return (
		<DateContext.Provider value={{ state, dispatch }}>
			{children}
		</DateContext.Provider>
	);
};

export default DateContext;
