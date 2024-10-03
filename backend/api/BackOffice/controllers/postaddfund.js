const { connection } = require("../../../connection");
const moment = require('moment');

const postaddfund = (req, res) => {
    const { name, email } = req.body;
    const date_time = moment().format('YYYY-MM-DD HH:mm:ss');
    const fund_id = Date.now();

    // First query to insert into `funds`
    const query = 'INSERT INTO funds (name, email, date_time, id) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, date_time, fund_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // If first query is successful, proceed with the second query
        const query2 = 'INSERT INTO funds_details (id) VALUES (?)';
        connection.query(query2, [fund_id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // If both queries are successful, send the final response
            return res.json({ message: 'Data inserted successfully into both tables' });
        });
    });
};

module.exports = postaddfund;
