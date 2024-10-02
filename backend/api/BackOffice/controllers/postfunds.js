const { connection } = require("../../../connection");

const postfunds = (req, res) => {
    const { email } = req.body;

    const query = 'SELECT * FROM funds WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Email data of funds', data: results });
    });
}

module.exports = postfunds;
