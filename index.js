import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { IndexConfig } from '#configs/index.config.js';
import "#models/sequelize/index.sequelize.js";
import { router } from './src/routes/index.route.js';

// จัดการ __dirname สำหรับ ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const LIFF_ID = process.env.LIFF_ID || "YOUR_LIFF_ID_HERE";

//"YOUR_LIFF_ID_HERE"

// Middleware
app.use(cors());
app.use(express.json());

// ตั้งค่า EJS เป็น View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// API Routes (ถ้ามี)
// ==========================================
const root_api = '/api/v1'
app.use(root_api, router)

// const root_api = '/api/v1'
// app.get(`${root_api}/roles`,(req,res)=>{
// })


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

// Start Server (เฉพาะเมื่อไม่ได้รันบน serverless เช่น Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {

    app.listen(PORT, async () => {
        await IndexConfig.connectDBViaSequelize()

        console.log(`🚀 Server is running on http://localhost:${PORT}`);
        console.log(`👉 หน้า Login: http://localhost:${PORT}/`);
    });
}

export default app;
