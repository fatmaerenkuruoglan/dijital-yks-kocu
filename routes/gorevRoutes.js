const express = require('express');
const router = express.Router();
const gorevController = require('../controllers/gorevController');
const verifyToken = require('../middleware/authMiddleware');

// --- 1. ANALİZ ROTALARI ---
router.get('/stats', verifyToken, gorevController.getDashboardStats);
router.get('/weekly', verifyToken, gorevController.getWeeklyStats);
router.get('/deneme', verifyToken, gorevController.getDenemeStats);

// --- 2. GÖREV YÖNETİMİ ---
// Yeni görev ekleme
router.post('/ekle', verifyToken, gorevController.addGorev);

// Görev silme
router.post('/sil', verifyToken, gorevController.deleteGorev);

// Görev durumu güncelleme
router.post('/guncelle', verifyToken, gorevController.updateGorevStatus);

// DİNAMİK ROTA HER ZAMAN EN ALTA OLMALI
router.get('/:tarih', verifyToken, gorevController.getGorevlerByTarih);

module.exports = router;