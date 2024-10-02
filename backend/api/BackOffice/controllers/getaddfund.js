const { connection } = require("../../../connection");
const moment = require('moment');

const getaddfund = (req, res) => {
    const { name, email } = req.body;

    const date_time = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(date_time);

    const fund_id = Date.now()


    const query = 'INSERT INTO funds (name, email, date_time, id) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, date_time, fund_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Data inserted successfully' });
    });
}
module.exports = getaddfund