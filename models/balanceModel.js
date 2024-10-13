const db = require('../config/db')

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => { // Pastikan Anda menggunakan db.query
    if (err) {
        return callback(err, null);
    }
    callback(null, results);
    });
};
  // Fungsi untuk mendapatkan balance pengguna berdasarkan email
const getUserBalance = (email, callback) => {
    const query = 'SELECT balance FROM balances WHERE email = ?';
    db.query(query, [email], (err, results) => { // Pastikan Anda menggunakan db.query
    if (err) {
        return callback(err, null);
    }
    callback(null, results);
    });
};
  // Ekspor fungsi model
    module.exports = {
    findUserByEmail,
    getUserBalance,
};