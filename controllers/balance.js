const balanceModel = require('../models/balanceModel');

const balance = {
  checkBalance: (req, res) => {
    const email = req.email; // Ambil email dari payload JWT

    balanceModel.getUserBalance(email, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      const balance = results[0].balance;
      res.json({
        status: 0,
        message :"get balance berhasil", 
        data: {balance}
    });
    });
  },
};

module.exports = balance;
