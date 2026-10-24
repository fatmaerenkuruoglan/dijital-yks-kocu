// Paylasim icin hazirlanan sifresiz baglanti ayarlari.
require('dotenv').config();

const required = ['DB_SERVER', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD'];
for (const name of required) {
    if (!process.env[name]) throw new Error(`Eksik ortam ayari: ${name}. .env.example dosyasina bakin.`);
}

module.exports = {
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT || 1433),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: process.env.DB_ENCRYPT !== 'false',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
    }
};
