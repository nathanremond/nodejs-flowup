const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: true
});

class BrandModel {
    static async getAll() {
        const result = await pool.query("SELECT * FROM brand");
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query(
            'SELECT * FROM brand WHERE id_brand = $1', 
            [id]
        )
        return result.rows[0]
    }
}

module.exports = BrandModel;