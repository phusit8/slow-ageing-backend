import express from "express";
import { methods as exercisesService } from "#services/exercises.service.js";

const router = express.Router();

const LIFF_ID = process.env.LIFF_ID || "YOUR_LIFF_ID_HERE";
const DEV_MODE = process.env.DEV_MODE === "false";

// ถ้าเปิด DEV_MODE → เข้า / จะ redirect ตรงไปหน้า home ข้าม LINE
router.get(['/', '/login'], (req, res) => {
    if (DEV_MODE) return res.redirect('/first-time-setup');
    res.render('login', { LIFF_ID });
});

router.get('/first-time-setup', (req, res) => res.render('first-time-setup', { LIFF_ID }));

router.get('/home', async (req, res) => {
    try {
        const result = await exercisesService.getActiveExercises();
        const exercises = result.code === 200 ? result.data : [];
        res.render('home', { LIFF_ID, exercises });
    } catch (error) {
        console.error("Route /home error:", error);
        res.render('home', { LIFF_ID, exercises: [] });
    }
});

router.get('/profile/edit', (req, res) => res.render('profile-edit', { LIFF_ID }));

router.get('/tasks', async (req, res) => {
    try {
        const result = await exercisesService.getActiveExercises();
        const exercises = result.code === 200 ? result.data : [];
        res.render('tasks', { exercises });
    } catch (error) {
        console.error("Route /tasks error:", error);
        res.render('tasks', { exercises: [] });
    }
});

router.get('/tasks/detail', async (req, res) => {
    try {
        const id = req.query.id;
        let exercise = null;
        if (id) {
            const result = await exercisesService.getExerciseById(id);
            if (result.code === 200) exercise = result.data;
        }
        res.render('task-detail', { exercise });
    } catch (error) {
        console.error("Route /tasks/detail error:", error);
        res.render('task-detail', { exercise: null });
    }
});

router.get('/tasks/incomplete', async (req, res) => {
    try {
        const result = await exercisesService.getActiveExercises();
        const exercises = result.code === 200 ? result.data : [];
        res.render('tasks-incomplete', { exercises });
    } catch {
        res.render('tasks-incomplete', { exercises: [] });
    }
});
router.get('/progress', (req, res) => res.render('progress'));
router.get('/profile', (req, res) => res.render('profile', { LIFF_ID }));
router.get('/calendar', (req, res) => res.render('calendar'));
router.get('/progress/monthly', (req, res) => res.render('calendar'));

export { router as viewRouter };
