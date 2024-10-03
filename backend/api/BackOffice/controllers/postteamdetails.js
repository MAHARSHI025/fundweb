const { connection } = require("../../../connection");

const postteamdetails = (req, res) => {

    const { fund_id, name, designation, description, linkedin_url } = req.body;


    const team_id = Date.now();
    console.log(team_id);


    const query = 'INSERT INTO team_details (team_id, name, designation, description, linkedin_url) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [team_id, name, designation, description, linkedin_url], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const query2 = 'UPDATE funds_details SET team_id = ? WHERE id = ?';
        connection.query(query2, [team_id, fund_id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
        
            return res.json({ message: 'Data updated successfully in fund_details' });
        });
    });

}

module.exports = postteamdetails