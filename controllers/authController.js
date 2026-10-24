const { getConnection, sql } = require('../db');
const jwt = require('jsonwebtoken');

// KAYIT OLMA
const register = async (req, res) => {
    try {
        const { 
            email, sifre, ad, soyad, hedef_bolum, telefon_no, 
            dogum_gunu, cinsiyet, city, lise_adi, mezuniyet_yili, diploma_notu 
        } = req.body;
        
        const pool = await getConnection();
        
        await pool.request()
            .input('email', sql.VarChar(100), email)
            .input('sifre', sql.VarChar(255), sifre)
            .input('ad', sql.VarChar(50), ad)
            .input('soyad', sql.VarChar(50), soyad)
            .input('hedef_bolum', sql.VarChar(100), hedef_bolum)
            .input('telefon_no', sql.VarChar(11), telefon_no)
            .input('dogum_gunu', sql.Date, dogum_gunu)
            .input('cinsiyet', sql.VarChar(30), cinsiyet)
            .input('city', sql.VarChar(50), city)
            .input('lise_adi', sql.VarChar(150), lise_adi)
            .input('mezun_yil', sql.Int, mezuniyet_yili)
            .input('notu', sql.Decimal(5, 2), diploma_notu)
            .query(`
                INSERT INTO Ogrenci 
                (email, sifre, ad, soyad, hedef_bolum, telefon_no, dogum_gunu, cinsiyet, city, lise_adi, mezuniyet_yili, diploma_notu) 
                VALUES 
                (@email, @sifre, @ad, @soyad, @hedef_bolum, @telefon_no, @dogum_gunu, @cinsiyet, @city, @lise_adi, @mezun_yil, @notu)
            `);

        res.status(201).send("Kayıt Başarılı! Şimdi giriş yapabilirsiniz.");
    } catch (err) {
        console.error("Kayıt hatası:", err.message);
        res.status(500).send("Sunucu hatası: " + err.message);
    }
};

// GİRİŞ YAPMA
const login = async (req, res) => {
    try {
        const { email, sifre } = req.body;
        const pool = await getConnection();
        
        const result = await pool.request()
            .input('email', sql.VarChar(100), email)
            .input('sifre', sql.VarChar(255), sifre)
            .query(`
                SELECT ogrenci_id, ad, soyad 
                FROM Ogrenci 
                WHERE email = @email AND sifre = @sifre
            `);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            const token = jwt.sign(
                { id: user.ogrenci_id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.status(200).json({ token, user });
        } else {
            res.status(401).send("Hatalı email veya şifre!");
        }
    } catch (err) {
        res.status(500).send("Sunucu hatası: " + err.message);
    }
};

// ŞİFREMİ UNUTTUM
const forgotPassword = async (req, res) => {
    try {
        const { email, sifre } = req.body;

        if (!email || !sifre) {
            return res.status(400).send("E-posta ve yeni şifre zorunludur.");
        }

        const pool = await getConnection();

        const userCheck = await pool.request()
            .input("email", sql.VarChar(100), email)
            .query(`
                SELECT ogrenci_id 
                FROM Ogrenci 
                WHERE email = @email
            `);

        if (userCheck.recordset.length === 0) {
            return res.status(404).send("Bu e-posta ile kayıtlı kullanıcı bulunamadı.");
        }

        await pool.request()
            .input("email", sql.VarChar(100), email)
            .input("sifre", sql.VarChar(255), sifre)
            .query(`
                UPDATE Ogrenci 
                SET sifre = @sifre 
                WHERE email = @email
            `);

        res.status(200).send("Şifre başarıyla güncellendi.");
    } catch (err) {
        console.error("Şifre güncelleme hatası:", err.message);
        res.status(500).send("Sunucu hatası: " + err.message);
    }
};

module.exports = { 
    register, 
    login,
    forgotPassword
};