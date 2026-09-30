import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// จัดการ __dirname สำหรับ ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ตั้งค่า EJS เป็น View Engine
app.set('view engine', 'ejs');
const viewsPath = path.resolve(process.cwd(), 'src', 'views');
app.set('views', [viewsPath, path.join(__dirname, 'src', 'views')]);

// ป้องกัน Browser/LINE In-App แคชหน้าเว็บค้าง
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// Static Files (รูปภาพ, CSS, JS ใน /public)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(process.cwd(), 'public')));

// โหลด Models + Routes แบบ Safe (ไม่แครชถ้า DB ไม่พร้อม)
try {
    await import("#models/sequelize/index.sequelize.js");
} catch (err) {
    console.warn("⚠️ Could not load Sequelize models:", err.message);
}

try {
    const { router } = await import('./src/routes/index.route.js');
    app.use('/', router);
} catch (err) {
    console.error("❌ Could not load routes:", err.message);
    // Fallback: ให้หน้า / แสดง Error แทนที่จะ Crash
    app.get('*', (req, res) => {
        res.status(500).send(`<h1>App failed to load routes</h1><pre>${err.stack}</pre>`);
    });
}

// Global Error Handler ป้องกัน Serverless Crash 500
app.use((err, req, res, next) => {
    console.error("Global Application Error:", err);
    res.status(500).type('text/html').send(`
        <div style="font-family: sans-serif; padding: 24px; max-width: 800px; margin: 40px auto; background: #fff1f0; border: 1px solid #ffa39e; border-radius: 12px;">
            <h2 style="color: #cf1322; margin-top: 0;">Application Error (500)</h2>
            <p><strong>Message:</strong> ${err.message || err}</p>
            <pre style="background: #ffffff; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #d9d9d9;">${err.stack || ''}</pre>
        </div>
    `);
});

// Start Server (เฉพาะเมื่อไม่ได้รันบน serverless เช่น Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const { IndexConfig } = await import('#configs/index.config.js');
    app.listen(PORT, async () => {
        await IndexConfig.connectDBViaSequelize();
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
        console.log(`👉 หน้า Login: http://localhost:${PORT}/`);
    });
}

export default app;
