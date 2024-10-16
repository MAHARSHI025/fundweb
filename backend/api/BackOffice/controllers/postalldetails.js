const { connection } = require("../../../connection");

const postalldetails = (req, res) => {
    const { fund_id } = req.body;

    const query = `
    SELECT 
        f.id, 
        f.description AS fund_description, 
        f.logo_url, 
        f.firm_assets, 
        f.strategy_assets, 
        f.strategy_url, 
        f.team_id, 
        f.date_updated, 
        t.name AS team_name, 
        t.designation AS team_designation, 
        t.description AS team_description, 
        t.linkedin_url
    FROM 
        altsinsight.funds_details f
    LEFT JOIN  
        altsinsight.team_details t 
    ON 
        f.team_id = t.team_id
    WHERE 
        f.id = ?`;

    connection.query(query, [fund_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // console.log(results);
        

        res.json({ message: 'Details of funds with team details', data: results });
    });
}

module.exports = postalldetails;
