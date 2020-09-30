import Head from "next/head";
import EntryTable from "../components/EntryTable";
import React, { useState, useContext } from "react";
import MonthPicker from "../components/MonthPicker/MonthPicker";
import DateContext from "../components/context/DateContext";
import styled from "styled-components";
import moment from "moment";
import Axios from "axios";

const Button = styled.button`
	padding: 0.5rem;
	margin-bottom: 1rem;
`;

export default function Home() {
	const date = useContext(DateContext);
	console.log(date);
	const defaultMonth = Number(moment().format("MM")) - 1;
	const defaultYear = Number(moment().format("YYYY"));
	const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
	const [selectedYear, setSelectedYear] = useState(defaultYear);
	const createSpreadsheet = () => {
		const regDeliv = calculateDeliveries();
		const premDeliv = calculateDeliveries("premDeliv");

		const mid = calculateMid();
		const regularTotal = calculateTotal("regular", mid);
		const premiumTotal = calculateTotal("premium", mid);
		const lastMonthBalance = Number(
			document.querySelector(`#lastMonthBalance`).value
		);
		const lastMonthBalancePrem = Number(
			document.querySelector(`#lastMonthBalancePrem`).value
		);

		Axios.post("/api/xl", {
			...date.state,
			regDeliv,
			premDeliv,
			mid,
			regularTotal,
			premiumTotal,
			lastMonthBalance,
			lastMonthBalancePrem,
		});
	};
	const calculateDeliveries = (delivColumn = "delivery") => {
		const result = [];
		date.state.daysInMonthArray.forEach((day) => {
			result.push(
				Number(document.querySelector(`#${delivColumn}-${day}`).value)
			);
		});

		return result;
	};
	const calculateMid = () => {
		const result = [];
		date.state.daysInMonthArray.forEach((day) => {
			result.push(parseFloat(document.querySelector(`#mid-${day}`).value / 2));
		});

		return result;
	};
	const calculateTotal = (columnName, midArray) => {
		//columnName (str) = regular or premium

		const result = [];
		date.state.daysInMonthArray.forEach((day, index) => {
			result.push(
				Number(document.querySelector(`#${columnName}-${day}`).value) +
					midArray[index]
			);
		});

		return result;
	};

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
				<div
					style={{
						display: "flex",
						width: "100%",

						marginBottom: "1rem",
					}}
				>
					<Button onClick={createSpreadsheet}>Create Spreadsheet</Button>
				</div>
				<div style={{ width: "100%", marginBottom: "1rem" }}>
					<label htmlFor="lastMonthBalance">Last Month Regular</label>
					<input
						style={{ margin: "0 1rem" }}
						id="lastMonthBalance"
						type="number"
					/>
					<label htmlFor="lastMonthBalancePrem">Last Month Premium</label>
					<input
						style={{ margin: "0 1rem" }}
						id="lastMonthBalancePrem"
						type="number"
					/>
				</div>
				<EntryTable />
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
