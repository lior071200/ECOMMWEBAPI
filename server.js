const bcrypt = require('bcrypt');
const registerUser = async (password) => {
    const saltRounds = 10; // מספר הסבבים (Rounds)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("סיסמה מוצפנת:", hashedPassword);
    // שמירת ה-hash בבסיס הנתונים
  };
  const jwt = require('jsonwebtoken');

const payload = { id: '12345', username: 'john_doe' }; // 1. תוכן להצפנה
const secretKey = 'yourSecretKey'; // 2. מפתח פרטי
const options = { expiresIn: '1h' }; // 3. אובייקט אפשרויות

const token = jwt.sign(payload, secretKey, options); // יצירת הטוקן
console.log('Generated Token:', token);
// 3. נקודת קצה מוגנת
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

  