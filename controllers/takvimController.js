const { getConnection, sql } = require('../db');

exports.getTasks = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('ogrenci_id', sql.Int, req.user.id)
            .query('SELECT baslik, hedef_tarih, oncelik_seviyesi, yapildi_mi FROM Gunluk_Gorevler WHERE ogrenci_id = @ogrenci_id');

        const tasksObj = {};
        result.recordset.forEach(row => {
            // Tarihi kayma olmadan yyyy-mm-dd formatına çevirir
            const d = new Date(row.hedef_tarih);
            const dateStr = d.getFullYear() + '-' + 
                           String(d.getMonth() + 1).padStart(2, '0') + '-' + 
                           String(d.getDate()).padStart(2, '0');

            if (!tasksObj[dateStr]) tasksObj[dateStr] = [];
            tasksObj[dateStr].push({ 
                text: row.baslik, 
                priority: row.oncelik_seviyesi,
                status: row.yapildi_mi ? 'done' : 'pending' 
            });
        });
        res.json(tasksObj);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addTask = async (req, res) => {
    const { text, date, priority } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('ogrenci_id', sql.Int, req.user.id)
            .input('baslik', sql.NVarChar, text)
            .input('hedef_tarih', sql.Date, date)
            .input('oncelik', sql.VarChar, priority || 'ORTA')
            .query(`INSERT INTO Gunluk_Gorevler (ogrenci_id, baslik, hedef_tarih, oncelik_seviyesi, yapildi_mi) 
                    VALUES (@ogrenci_id, @baslik, @hedef_tarih, @oncelik, 0)`);
        
        res.status(201).json({ message: "Görev Eklendi" });
    } catch (err) {
        console.error("SQL Hatası:", err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { date, text } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('ogrenci_id', sql.Int, req.user.id)
            .input('baslik', sql.NVarChar, text)
            .input('hedef_tarih', sql.Date, date)
            .query(`
                DELETE TOP (1) FROM Gunluk_Gorevler 
                WHERE ogrenci_id = @ogrenci_id 
                AND baslik = @baslik 
                AND hedef_tarih = @hedef_tarih
            `);

        res.status(200).send("Görev başarıyla silindi.");
    } catch (err) {
        console.error("Silme hatası:", err);
        res.status(500).json({ error: "Veritabanından silinemedi." });
    }
};