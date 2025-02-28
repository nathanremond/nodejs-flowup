const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: true,
});

class ProductModel {
    static async getAll() {
        const result = await pool.query('SELECT * FROM product');
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query(
            'SELECT * FROM product WHERE id_product = $1', 
            [id]
        )
        return result.rows[0]
    }

    static async create({ name, picture_url, price, description, graphic_card, processor, ram, storage, guarantee, serial_number, model, game_types, id_brand, id_category }) {
        const result = await pool.query(
          "INSERT INTO product (name, picture_url, price, description, graphic_card, processor, ram, storage, guarantee, serial_number, model, game_types, id_brand, id_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
          [
            name,
            picture_url,
            price,
            description,
            graphic_card,
            processor,
            ram,
            storage,
            guarantee,
            serial_number,
            model,
            game_types,
            id_brand,
            id_category,
          ]
        );
        return result.rows[0]
    }

    static async update(id, { name, picture_url, price, description, graphic_card, processor, ram, storage, guarantee, serial_number, model, game_types, id_brand, id_category }) {
        const result = await pool.query(
          "UPDATE product SET name = $1, picture_url = $2, price = $3, description = $4, graphic_card = $5, processor = $6, ram = $7, storage = $8, guarantee = $9, serial_number = $10, model = $11, game_types = $12, id_brand = $13, id_category = $14  WHERE id_product = $15 RETURNING * ",
          [
            name,
            picture_url,
            price,
            description,
            graphic_card,
            processor,
            ram,
            storage,
            guarantee,
            serial_number,
            model,
            game_types,
            id_brand,
            id_category,
            id
          ]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query("DELETE FROM product WHERE id_product = $1", [id]);
    }
}

module.exports = ProductModel;