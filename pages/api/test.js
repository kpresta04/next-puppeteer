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

	const addDates = (sheet) => {
		const worksheet = workbook.getWorksheet(sheet);
		for (let i = 1; i <= state.monthLength; i++) {
			let cell = worksheet.getCell(`A${i + 1}`);

			// Modify/Add individual cell
			cell.value = state.month + "/" + i + "/" + state.year;
		}
	};
	const insertValues = (sheet, column, valuesToInsert) => {
		const worksheet = workbook.getWorksheet(sheet);
		for (let i = 1; i <= state.monthLength; i++) {
			let cell = worksheet.getCell(`${column}${i + 1}`);

			// Modify/Add individual cell
			cell.value = valuesToInsert[i - 1];
		}
	};
	const insertFormulas = (sheet = "Regular", column = "G", formula = "f-e") => {
		const worksheet = workbook.getWorksheet(sheet);
		for (let i = 1; i <= state.monthLength; i++) {
			let cell = worksheet.getCell(`${column}${i + 1}`);

			// Modify/Add individual cell
			cell.value = {
				formula: `${formula[0]}${i + 1}${formula[1]}${formula[2]}${i + 1}`,
			};
		}
		if (sheet === "Regular") {
			insertFormulas("Premium");
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
	insertValues("Regular", "C", state.regDeliv);
	insertFormulas();

	const fileName = `LQ.${state.month}.${state.year}` + ".xlsx";
	workbook.xlsx.writeFile(fileName);
	res.send("Saved as " + fileName);
};
