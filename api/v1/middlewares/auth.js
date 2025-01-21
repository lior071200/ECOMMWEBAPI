const jwt = require('jsonwebtoken');
const SECRET_KEY = 'yourSecretKey'; // חייב להתאים למפתח שנמצא ב-login

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // חיפוש הטוקן בהדר Authorization

  if (!token) {
    return res.status(401).json({ message: 'גישה נדחתה: לא נמצא טוקן' });
  }

  try {
    // פענוח הטוקן
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // שמירת המידע מהטוקן בבקשה
    next(); // מעבר לנתיב הבא
  } catch (error) {
    res.status(403).json({ message: 'טוקן לא תקין או פג תוקף', error });
  }
};
