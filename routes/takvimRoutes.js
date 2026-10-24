const express = require('express');
const router = express.Router();
// Sadece ihtiyacın olanları çağır
const takvimController = require('../controllers/takvimController');
const authMiddleware = require('../middleware/authMiddleware');

// Veri Çekme
router.get('/tasks', authMiddleware, takvimController.getTasks);

// Veri Ekleme - Sadece takvimController kullanmalısın
router.post('/add-task', authMiddleware, takvimController.addTask);

// verilerin silinmesi için 
router.delete('/delete', authMiddleware, takvimController.deleteTask);

module.exports = router;