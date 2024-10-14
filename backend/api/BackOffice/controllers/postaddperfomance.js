const { connection } = require("../../../connection");

const postaddperfomance = async (req, res) => {
    const excelData = req.body;  // Data from the frontend
    console.log('Received Excel Data:', excelData);
    
    const promises = []; // Array to hold promises for each query

    // Loop through each row from the parsed Excel data
    excelData.forEach((row) => {
        const class_name = `Shareclass ${row.Shareclass1}`; // Construct class_name
        const year = row.Shareclass1;  // Use year directly from data

        const months = {
            Jan2024: row.jan,
            Feb2024: row.feb,
            Mar2024: row.mar,
            Apr2024: row.apr,
            May2024: row.may,
            Jun2024: row.jun,
            Jul2024: row.jul,
            Aug2024: row.aug,
            Sep2024: row.sep,
            Oct2024: row.oct,
            Nov2024: row.nov,
            Dec2024: row.dec,
        };

        Object.keys(months).forEach(month => {
            const value = months[month];

            if (value) {
                // Check if class_name and month exist
                const checkQuery = `SELECT * FROM funds_performance WHERE class_name = ? AND ${month} IS NOT NULL`;
                console.log('Executing check query:', checkQuery, [class_name]);

                const promise = new Promise((resolve, reject) => {
                    connection.query(checkQuery, [class_name], (err, result) => {
                        if (err) {
                            console.error('Error checking class_name and month:', err);
                            return reject(err);
                        }

                        if (result.length > 0) {
                            // class_name and month already exist, skip or update if necessary
                            console.log(`class_name "${class_name}" for ${month} already exists, skipping...`);
                            return resolve(); // Resolve without error
                        } else {
                            // Insert new data for the month
                            const insertQuery = `INSERT INTO funds_performance (class_name, ${month}) VALUES (?, ?) 
                                ON DUPLICATE KEY UPDATE ${month} = ?`;
                            console.log('Executing insert query:', insertQuery, [class_name, value, value]);

                            connection.query(insertQuery, [class_name, value, value], (err, result) => {
                                if (err) {
                                    console.error('Error inserting data:', err);
                                    return reject(err);
                                }
                                console.log(`class_name "${class_name}" for ${month} inserted successfully`);
                                resolve(); // Resolve when insert is successful
                            });
                        }
                    });
                });

                promises.push(promise); // Add promise to the array
            }
        });
    });

    // Wait for all promises to resolve or reject
    try {
        await Promise.all(promises);
        res.send('Data processed successfully'); // Send response after all operations are completed
    } catch (error) {
        res.status(500).send('Database error');
    }
}

module.exports = postaddperfomance;
