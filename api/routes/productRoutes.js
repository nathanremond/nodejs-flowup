const express = require("express");
const router = express.Router();
const ProductModel = require("../models/productModel");

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/product", async (req, res) => {
  try {
    const result = await ProductModel.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/product/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const result = await ProductModel.getById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /category/{id_category}/product:
 *   get:
 *     summary: Get a product by category ID
 *     tags: [Products]
 *     parameters:
 *       - name: id_category
 *         in: path
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/category/:id_category/product", async (req, res) => {
  try {
    const id_category = req.params.id_category;
    const result = await ProductModel.getByCategory(
      id_category
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @swagger
 * /brand/{id_brand}/product:
 *   get:
 *     summary: Get a product by brand ID and category ID
 *     tags: [Products]
 *     parameters:
 *       - name: id_brand
 *         in: path
 *         required: true
 *         description: The ID of the brand
 *         schema:
 *           type: integer
 *       - name: category
 *         in: query
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/brand/:id_brand/product", async (req, res) => {
  try {
    const id_brand = req.params.id_brand;
    const id_category = req.query.category;
    const result = await ProductModel.getByBrandAndCategory(id_brand, id_category);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: Informations of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.post("/product", async (req, res) => {
  try {
    const result = await ProductModel.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @swagger
 * /product:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         required: true
 *         description: Informations of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.put("/product/:id", async (req, res) => {
  try {
    const result = await ProductModel.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



/**
 * @swagger
 * /product:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.delete("/product/:id", async (req, res) => {
  try {
    await ProductModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;