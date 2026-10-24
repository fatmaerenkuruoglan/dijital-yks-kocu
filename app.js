require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// --- Rota Tanımlamaları ---
const authRoutes = require('./routes/authRoutes');
const konuRoutes = require('./routes/konuRoutes');
const takvimRoutes = require('./routes/takvimRoutes');
const gorevRoutes = require('./routes/gorevRoutes'); 
const analizRoutes = require('./routes/analizRoutes'); 
const pomodoroRoutes = require('./routes/pomodoroRoutes');
const hedefRoutes = require("./routes/hedefRoutes");



const app = express();

// --- Middleware ---
app.use(cors()); 
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth', authRoutes);
app.use('/api/konu', konuRoutes);
app.use('/api/takvim', takvimRoutes);
app.use('/api/gorev', gorevRoutes);
app.use('/api/analiz', analizRoutes); 
app.use('/api/pomodoro', pomodoroRoutes); 
app.use("/api/hedef", hedefRoutes);



// 1. Giriş Sayfası
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Şifremi Unuttum Sayfası
app.get('/forgot_password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forgot_password.html'));
});

// 2. Dashboard (Anasayfa)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'anasayfa.html'));
});

// 3. Konu Takip
app.get('/konu-takip', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'konuTakip.html'));
});

// 4. Takvim
app.get('/takvim', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'takvim.html'));
});

// 5. Analiz 
app.get('/analiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'analiz.html'));
});

// 6. Pomodoro 
app.get('/pomodoro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pomodoro.html'));
});


app.use((req, res) => {
    res.status(404).send("Üzgünüz, aradığınız sayfa bulunamadı.");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 YKS Koçum Sunucusu Yayında!`);
    console.log(`------------------------------------------`);
    console.log(`👉 Ana Giriş:      http://localhost:${PORT}`);
    console.log(`📊 Dashboard:      http://localhost:${PORT}/dashboard`);
    console.log(`📚 Konu Takip:     http://localhost:${PORT}/konu-takip`);
    console.log(`📅 Takvim:         http://localhost:${PORT}/takvim`);
    console.log(`📈 Analiz:         http://localhost:${PORT}/analiz`);
    console.log(`⏱️  Pomodoro:       http://localhost:${PORT}/pomodoro`);
    console.log(`------------------------------------------\n`);
});