const db = require('../config/db');

exports.addTopup = (email, amount) => {
    return new Promise((resolve, reject) => {
        // Update balance user
        db.query('UPDATE balances SET balance = balance + ? WHERE email = ?', [amount, email], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return reject({ success: false, message: 'Database operation failed' });
            }

            // Insert transaction record
            db.query('INSERT INTO transactions (email, amount, transaction_type) VALUES (?, ?, ?)', [email, amount, 'topup'], (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return reject({ success: false, message: 'Database operation failed' });
                }

                // Ambil saldo terbaru
                db.query('SELECT balance FROM balances WHERE email = ?', [email], (error, results) => {
                    if (error) {
                        console.error('Database error:', error);
                        return reject({ success: false, message: 'Database operation failed' });
                    }

                    resolve({
                        success: true,
                        balance: results[0].balance // Kembalikan saldo terbaru
                    });
                });
            });
        });
    });
};
