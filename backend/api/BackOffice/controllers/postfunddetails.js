const { connection } = require("../../../connection");
const moment = require('moment');

const postfunddetails = (req, res) => {

    const { fund_id, description, firm_assets, strategy_assets, strategy_url } = req.body;

    const date_updated = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(date_updated);

    const logo_url = "https://static.vecteezy.com/system/resources/previews/028/233/398/non_2x/letter-m-book-simple-elegant-education-logo-vector.jpg"

    const query = 'UPDATE funds_details SET description = ?, logo_url = ?, firm_assets = ?, strategy_assets = ?, strategy_url = ?, date_updated = ?  WHERE id = ?';
    connection.query(query, [description, logo_url, firm_assets, strategy_assets, strategy_url, date_updated, fund_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.json({ message: 'Data updated successfully in fund_details' });
    });

}

module.exports = postfunddetails