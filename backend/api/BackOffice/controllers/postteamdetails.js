const { connection } = require("../../../connection");

const postteamdetails = (req, res) => {
    let { fund_id, team_id, name, designation, description, linkedin_url } = req.body;

    console.log("Received team_id:", team_id);

    // Correctly check if team_id is empty or null
    if (!team_id) {
        team_id = Date.now(); // Assign a unique value if team_id is not provided
        console.log("Generated new team_id:", team_id);
    }

    const query = 'INSERT INTO team_details (team_id, name, designation, description, linkedin_url) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [team_id, name, designation, description, linkedin_url], (err, results) => {
        if (err) {
            console.error("Error inserting into team_details:", err);
            return res.status(500).json({ error: err.message });
        }

        console.log("Inserted into team_details, updating fund_details...");

        const query2 = 'UPDATE funds_details SET team_id = ? WHERE id = ?';
        console.log("fund_id",fund_id);
        
        connection.query(query2, [team_id, fund_id], (err, results) => {
            if (err) {
                console.error("Error updating funds_details:", err);
                return res.status(500).json({ error: err.message });
            }
            console.log("Updated fund_details with team_id:", team_id);
            return res.json({ message: 'Data updated successfully in fund_details' });
        });
    });
};

module.exports = postteamdetails;
