const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// נקודת קצה להרשמה
router.post('/register', usersController.registerUser);

// נקודת קצה להתחברות
router.post('/login', usersController.loginUser);
const express = require('express');

const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

// נקודת קצה להרשמה
router.post('/register', usersController.registerUser);

// נקודת קצה להתחברות
router.post('/login', usersController.loginUser);

// נקודת קצה מוגנת לדוגמה
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'גישה הותרה!', user: req.user });
});

module.exports = router;



