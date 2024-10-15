const { connection } = require("../../../connection");
const util = require("util");

const postaddperfomance = async (req, res) => {
  const excelData = req.body; // Data from the frontend
  console.log('Received data:', excelData);

  // Validate incoming data
  if (!Array.isArray(excelData) || excelData.length === 0) {
    return res.status(400).send('Invalid input data');
  }

  try {
    const query = util.promisify(connection.query).bind(connection);
    const tableName = 'funds_performance'; // Ensure this is correct

    const sqlQuery = `SHOW COLUMNS FROM ??`;
    const rows = await query(sqlQuery, [tableName]);

    const columnNames = rows.map(row => row.Field); // 'Field' contains the column name
    console.log('Column names from DB:', columnNames); // Log the extracted column names

    const commonresults = [];
    const noncommonresults = [];

    // Prepare to track columns to add
    const columnsToAdd = [];

    for (const shareclass of excelData) {
      const year = shareclass.Shareclass1;
      const months = Object.keys(shareclass).filter(key => key !== 'Shareclass1');

      const result = months.map(month => `${month}${year}`);
      console.log("Column names from frontend:", result);

      const commonColumns = result.filter(monthYear => columnNames.includes(monthYear));
      const nonCommonColumns = result.filter(monthYear => !columnNames.includes(monthYear));

      commonresults.push({ year, commonColumns }); // Collect results for response
      noncommonresults.push({ year, nonCommonColumns }); // Collect results for response

      // Collect non-common columns for adding
      columnsToAdd.push(...nonCommonColumns);
    }

    console.log("Common result:", commonresults);
    console.log("Non-common result:", noncommonresults);

    // Add new columns to the table
    for (const column of [...new Set(columnsToAdd)]) { // Use Set to avoid duplicates
      const addColumnQuery = `ALTER TABLE ?? ADD COLUMN ?? DECIMAL(10, 2)`;
      await query(addColumnQuery, [tableName, column]);
      console.log(`Added column: ${column}`);
    }

    res.json({
      commonResults: commonresults,
      nonCommonResults: noncommonresults,
    });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Database error: ' + error.message);
  }
};

module.exports = postaddperfomance;
