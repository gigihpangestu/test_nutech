const topupModel = require('../models/topupModel');

exports.topupBalance = (req, res) => {
    if (!req.user || !req.user.email) {
        return res.status(401).json({ message: 'Unauthorized: No user information found.' });
    }

    const amount = parseInt(req.headers['topup-amount'], 10);

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount. Must be a positive number.' });
    }

    const email = req.user.email; // Ambil email dari payload JWT

    topupModel.addTopup(email, amount)
        .then(result => {
            return res.status(200).json({
                message: `Top-up successful! Your new balance is ${result.balance}.`,
                balance: result.balance
            });
        })
        .catch(error => {
            return res.status(400).json({ message: error.message });
        });
};
