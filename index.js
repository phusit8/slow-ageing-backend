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

// Middleware
app.use(cors());
app.use(express.json());

// ตั้งค่า EJS เป็น View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Static Files (รูปภาพ, CSS, JS ใน /public)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.resolve(__dirname, '..', 'sa-backoffice', 'src', 'public', 'assets')));

// Routes
app.use('/', router);

// Start Server (เฉพาะเมื่อไม่ได้รันบน serverless เช่น Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, async () => {
        await IndexConfig.connectDBViaSequelize()
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
        console.log(`👉 หน้า Login: http://localhost:${PORT}/`);
    });
}

export default app;
