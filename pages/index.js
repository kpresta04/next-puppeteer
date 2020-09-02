import Head from "next/head";
import EntryTable from "../components/EntryTable";
import React, { useState, useEffect, useContext } from "react";
import MonthPicker from "../components/MonthPicker/MonthPicker";
import DateContext from "../components/context/DateContext";
import moment from "moment";
const getDaysInMonthArray = (monthLength) => {
	const dayArray = [];
	for (let i = 1; i <= monthLength; i++) {
		dayArray.push(i);
	}
	// console.log(dayArray);
	return dayArray;
};

export default function Home() {
	const date = useContext(DateContext);
	console.log(date);
	const defaultMonth = Number(moment().format("MM")) - 1;
	const defaultYear = Number(moment().format("YYYY"));
	const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
	const [selectedYear, setSelectedYear] = useState(defaultYear);
	const [daysInMonthArray, setDaysInMonthArray] = useState(
		getDaysInMonthArray(
			moment(`${defaultYear}-${defaultMonth}`, "YYYY-MM").daysInMonth()
		)
	);

	useEffect(() => {
		// console.log(selectedMonth, selectedYear);

		setDaysInMonthArray(
			getDaysInMonthArray(
				moment(`${selectedYear}-${selectedMonth}`, "YYYY-MM").daysInMonth()
			)
		);
		// console.log(daysInMonth);
	}, [selectedMonth]);

	return (
		<div className="container">
			<Head>
				<title>Next Puppeteer</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1 className="title">
					Next <a href="#">Puppeteer</a>
				</h1>
				<MonthPicker
					defaultMonth={defaultMonth}
					defaultYear={defaultYear}
					selectedMonth={selectedMonth}
					setSelectedMonth={setSelectedMonth}
					selectedYear={selectedYear}
					setSelectedYear={setSelectedYear}
				/>
				<EntryTable daysInMonthArray={daysInMonthArray} />
			</main>

			<style jsx>{`
				.container {
					min-height: 100vh;
					padding: 0 0.5rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				footer {
					width: 100%;
					height: 100px;
					border-top: 1px solid #eaeaea;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				footer img {
					margin-left: 0.5rem;
				}

				footer a {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				a {
					color: inherit;
					text-decoration: none;
				}

				.title a {
					color: #0070f3;
					text-decoration: none;
				}

				.title a:hover,
				.title a:focus,
				.title a:active {
					text-decoration: underline;
				}

				.title {
					margin: 0;
					line-height: 1.15;
					font-size: 4rem;
				}

				.title,
				.description {
					text-align: center;
				}

				.description {
					line-height: 1.5;
					font-size: 1.5rem;
				}

				code {
					background: #fafafa;
					border-radius: 5px;
					padding: 0.75rem;
					font-size: 1.1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
						DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
				}

				.grid {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;

					max-width: 800px;
					margin-top: 3rem;
				}

				.card {
					margin: 1rem;
					flex-basis: 45%;
					padding: 1.5rem;
					text-align: left;
					color: inherit;
					text-decoration: none;
					border: 1px solid #eaeaea;
					border-radius: 10px;
					transition: color 0.15s ease, border-color 0.15s ease;
				}

				.card:hover,
				.card:focus,
				.card:active {
					color: #0070f3;
					border-color: #0070f3;
				}

				.card h3 {
					margin: 0 0 1rem 0;
					font-size: 1.5rem;
				}

				.card p {
					margin: 0;
					font-size: 1.25rem;
					line-height: 1.5;
				}

				.logo {
					height: 1em;
				}

				@media (max-width: 600px) {
					.grid {
						width: 100%;
						flex-direction: column;
					}
				}
			`}</style>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
}
