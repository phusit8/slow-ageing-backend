require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const LIFF_ID = process.env.LIFF_ID || "YOUR_LIFF_ID_HERE";

// Middleware
app.use(cors());
app.use(express.json());

// ตั้งค่า EJS เป็น View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// API Routes (ถ้ามี)
// ==========================================
app.post('/api/user/setup', (req, res) => {
    const userData = req.body;
    console.log("ได้รับข้อมูลตั้งค่า:", userData);
    // TODO: นำข้อมูลไปบันทึกลง Database จริงๆ
    res.json({ success: true, message: "บันทึกข้อมูลสำเร็จ", data: userData });
});

// ==========================================
// EJS Page Routes (หน้าเว็บต่างๆ)
// ==========================================
app.get('/', (req, res) => {
    res.render('login', { LIFF_ID });
});

app.get('/first-time-setup', (req, res) => {
    res.render('first-time-setup', { LIFF_ID });
});

app.get('/home', (req, res) => {
    res.render('home', { LIFF_ID });
});

app.get('/tasks', (req, res) => {
    res.render('tasks');
});

app.get('/tasks/incomplete', (req, res) => {
    res.render('tasks-incomplete');
});

app.get('/progress', (req, res) => {
    res.render('progress');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/profile/edit', (req, res) => {
    res.render('profile-edit', { LIFF_ID });
});

app.get('/calendar', (req, res) => {
    res.render('calendar');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`👉 หน้า Login: http://localhost:${PORT}/`);
});
