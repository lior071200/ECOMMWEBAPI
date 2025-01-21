const bcrypt = require('bcrypt');
const User = require('../models/User');

// הרשמה
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // בדיקה אם המשתמש קיים
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'שם משתמש כבר קיים' });
    }

    // הצפנת הסיסמה
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // יצירת משתמש חדש
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'משתמש נוצר בהצלחה' });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה ביצירת המשתמש', error });
  }
};

// התחברות
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // בדיקה אם המשתמש קיים
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'שם משתמש או סיסמה אינם נכונים' });
    }

    // השוואת הסיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'שם משתמש או סיסמה אינם נכונים' });
    }

    res.status(200).json({ message: 'התחברות הצליחה', username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בהתחברות', error });
  }
};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SECRET_KEY = 'yourSecretKey'; // יש להחליף במפתח סודי חזק

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // בדיקה אם המשתמש קיים
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'שם משתמש או סיסמה אינם נכונים' });
    }

    // השוואת סיסמאות
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'שם משתמש או סיסמה אינם נכונים' });
    }

    // יצירת טוקן
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'התחברות הצליחה', token });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בהתחברות', error });
  }
};

