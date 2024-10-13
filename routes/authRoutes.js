const express = require('express');
const { register, login } = require('../controllers/authController');
const balance = require('../controllers/balance');
const topup = require('../controllers/topup');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login)

router.get('/balance', verifyToken, balance.checkBalance);

router.post('/topup', verifyToken, topup.topupBalance);

module.exports = router;
