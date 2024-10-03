const { connection } = require("../../../connection");

const postalldetails = (req, res) => {
    const { fund_id } = req.body;

    // Correct SQL query with proper table joins
    const query = `
        SELECT funds.*, funds_details.*, team_details.* 
        FROM funds 
        LEFT JOIN funds_details ON funds.id = funds_details.id
        LEFT JOIN team_details ON funds_details.team_id = team_details.team_id
        WHERE funds.id = ?`;

    connection.query(query, [fund_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Details of funds with team details', data: results });
    });
}

module.exports = postalldetails;
