import Excel from "exceljs";
import XLSX from "xlsx";
export default (req, res) => {
	// res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	// res.end(JSON.stringify({ name: "John Doe" }));

	const state = req.body;
	console.log(state);
	const workbook = new Excel.Workbook();
	workbook.creator = "Kellen Presta";

	workbook.created = new Date();
	workbook.modified = new Date();
	workbook.views = [
		{
			x: 0,
			y: 0,
			width: 10000,
			height: 20000,
			firstSheet: 0,
			activeTab: 1,
			visibility: "visible",
		},
	];
	const RegSheet = workbook.addWorksheet("Regular");
	const PremiumSheet = workbook.addWorksheet("Premium");

	const formulas = ["f-e", "e", "b+c-d", "g+h"];
	const getFormula = (formula, index) => {
		switch (formula) {
			case "f-e":
				return `f${index}-e${index}`;
			case "e":
				if (index - 1 > 1) {
					return `e${index - 1}`;
				} else {
					return 0;
				}
			case "b+c-d":
				return `b${index}+c${index}-d${index}`;

			case "g+h":
				return `g${index}+h${index - 1}`;
		}
	};
	const addDates = (sheet) => {
		const worksheet = workbook.getWorksheet(sheet);
		for (let i = 1; i <= state.monthLength; i++) {
			let cell = worksheet.getCell(`A${i + 1}`);

			// Modify/Add individual cell
			cell.value = state.month + "/" + i + "/" + state.year;
		}
	};
	const insertValue = (sheet, column, valuesToInsert, i) => {
		const worksheet = workbook.getWorksheet(sheet);
		// for (let i = 1; i <= state.monthLength; i++) {
		let cell = worksheet.getCell(`${column}${i + 1}`);

		// Modify/Add individual cell
		cell.value = valuesToInsert[i - 1];
		// }
	};
	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
	};
	const insertDips = (sheet = "Regular") => {
		const worksheet = workbook.getWorksheet(sheet);
		for (let i = 1; i <= state.monthLength; i++) {
			let endBal = worksheet.getCell(`E${i + 1}`).result;

			let cell = worksheet.getCell(`F${i + 1}`);
			// cell.value = endBal + getRandomInt(-20, 10);
			console.log(endBal);
		}
	};
	const quickFixes = (sheet = "Regular") => {
		const worksheet = workbook.getWorksheet(sheet);

		let cell = worksheet.getCell("B2");

		// Modify/Add individual cell
		if (sheet === "Regular") {
			cell.value = state.lastMonthBalance;
		} else {
			cell.value = state.lastMonthBalancePrem;
		}
		cell = worksheet.getCell("H2");
		cell.value = {
			formula: "=G2",
		};
	};

	const insertRows = (sheet = "Regular", index) => {
		const worksheet = workbook.getWorksheet(sheet);
		const premSheet = workbook.getWorksheet("Premium");
		for (let i = 1; i <= state.monthLength; i++) {
			insertValue("Regular", "C", state.regDeliv, i);
			insertValue("Premium", "C", state.premDeliv, i);
			insertValue("Regular", "D", state.regularTotal, i);
			insertValue("Premium", "D", state.premiumTotal, i);
			if (i + 1 === 2) {
				let customCell = worksheet.getCell("B2");
				customCell.value = state.lastMonthBalance;
				customCell = premSheet.getCell("B2");
				customCell.value = state.lastMonthBalancePrem;
			}
			insertEndBalance("Regular", i);
		}
	};
	const insertEndBalance = (sheet = "Regular", i) => {
		const worksheet = workbook.getWorksheet(sheet);
		const cell = worksheet.getCell(`E${i + 1}`);
		const bCell = worksheet.getCell(`B${i + 1}`);
		const cCell = worksheet.getCell(`C${i + 1}`);
		const dCell = worksheet.getCell(`D${i + 1}`);

		cell.value = {
			formula: getFormula(formulas[2], i + 1),
			result: bCell + cCell - dCell,
		};
		if (sheet === "Regular") {
			insertEndBalance("Premium", i);
		}
	};
	const insertFormulas = (
		sheet = "Regular",
		column = "G",
		formula = "f-e",
		i
	) => {
		const worksheet = workbook.getWorksheet(sheet);
		// for (let i = 1; i <= state.monthLength; i++) {
		let cell = worksheet.getCell(`${column}${i + 1}`);

		// Modify/Add individual cell
		cell.value = {
			formula: getFormula(formula, i + 1),
		};
		// }
		if (sheet === "Regular") {
			insertFormulas("Premium", column, formula, i);
		}
	};

	RegSheet.columns = [
		{
			header: "DATE",
			key: "id",
			width: 12,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "BEGIN BALANCE",
			key: "BB",
			width: 18,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "PURCH",
			key: "PURCH",
			width: 10,

			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "SALES",
			key: "SALES",
			width: 10,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "ENDING BALANCE",
			key: "EB",
			width: 18,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "DIPS",
			key: "DIPS",
			width: 10,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "O/S",
			key: "O/S",
			width: 10,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},

		{
			header: "MTD O/S",
			key: "MTD O/S",
			width: 10,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
	];
	PremiumSheet.columns = [
		{
			header: "DATE",
			key: "id",
			width: 12,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "BEGIN BALANCE",
			key: "BB",
			width: 18,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "PURCH",
			key: "PURCH",
			width: 10,

			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "SALES",
			key: "SALES",
			width: 10,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "ENDING BALANCE",
			key: "EB",
			width: 18,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "DIPS",
			key: "DIPS",
			width: 10,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
		{
			header: "O/S",
			key: "O/S",
			width: 10,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},

		{
			header: "MTD O/S",
			key: "MTD O/S",
			width: 10,
			style: {
				alignment: { vertical: "middle", horizontal: "center" },
				border: {
					top: { style: "thin" },
					left: { style: "thin" },
					bottom: { style: "thin" },
					right: { style: "thin" },
				},
			},
		},
	];

	addDates("Regular");
	addDates("Premium");
	// insertValues("Regular", "C", state.regDeliv);
	// insertValues("Premium", "C", state.premDeliv);
	// insertValues("Regular", "D", state.regularTotal);
	// insertValues("Premium", "D", state.premiumTotal);

	// insertFormulas();
	// insertFormulas("Regular", "B", formulas[1]);
	// insertFormulas("Regular", "E", formulas[2]);
	// insertFormulas("Regular", "E", formulas[2]);
	// insertFormulas("Regular", "H", formulas[3]);

	// quickFixes();
	// quickFixes("Premium");
	// insertDips();
	insertRows();

	const fileName = `LQ.${state.month}.${state.year}` + ".xlsx";
	workbook.xlsx.writeFile(fileName);
	res.send("Saved as " + fileName);
};
