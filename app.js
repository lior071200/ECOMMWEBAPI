const loginUser = async (inputPassword, storedHashedPassword) => {
    const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
    if (isMatch) {
      console.log("התחברות מוצלחת");
    } else {
      console.log("סיסמה שגויה");
    }
  };
  const bcrypt = require('bcrypt');

// מספר הסבבים ליצירת ה-salt
const saltRounds = 10;

// טקסט להצפנה
const password = "mySecretPassword";

// שימוש ב-hash עם פונקציית חזרה
bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error("שגיאה ביצירת ההצפנה:", err);
    return;
  }
  console.log("סיסמה מוצפנת:", hashedPassword);

  // ניתן לבצע כאן פעולות נוספות, כמו שמירה בבסיס הנתונים
});
const inputPassword = "mySecretPassword";
const hashFromDB = "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36F4DJo/KU3Z3ujtWiK5VfO";

bcrypt.compare(inputPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error("שגיאה בהשוואה:", err.message);
    return;
  }
  if (isMatch) {
    console.log("הסיסמה תואמת!");
  } else {
    console.log("הסיסמה אינה תואמת!");
  }
});


bcrypt.compare(inputPassword, hashFromDB)
  .then((status) => {
    if (status) {
      console.log("הסיסמה נכונה!");
    } else {
      console.log("סיסמה שגויה.");
    }
  })
  .catch((err) => {
    console.error("שגיאה בהשוואת הסיסמאות:", err.message);
  });
  const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

// חיבור לבסיס הנתונים
mongoose
  .connect('mongodb://localhost:27017/mvc_example', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// נתיבים
app.use('/user', userRoutes);

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
jwt.sign(payload, secretKey, options, (err, token) => {
    if (err) {
      console.error('Error generating token:', err);
    } else {
      console.log('Generated Token:', token);
    }
  });
  const util = require('util');
const signAsync = util.promisify(jwt.sign);

signAsync(payload, secretKey, options)
  .then((token) => console.log('Generated Token:', token))
  .catch((err) => console.error('Error generating token:', err));
// 2. שכבת אבטחה לזיהוי ואימות טוקן
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // הוספת המידע של המשתמש ל-request
    next();
  });
}