const db = require('../config/db');

const User = {
  register: (email, first_Name, last_Name, password) => {
    const query = 'INSERT INTO profile (email, first_name, last_name, password) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [email, first_Name, last_Name, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  login: (email, password) => {
    const query = 'SELECT * FROM profile WHERE email = ? AND password = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [email, password], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length > 0) {
          resolve(result[0]); // Jika ditemukan user, return user
        } else {
          resolve(null); // Jika user tidak ditemukan
        }
      });
    });
  },

};

module.exports = User;
