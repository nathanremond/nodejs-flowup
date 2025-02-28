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
router.get("/", async (req, res) => {
  try {
    const result = await ProductModel.getAllProducts();
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
router.get("/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const result = await ProductModel.getProductById(id);
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
router.post("/", async (req, res) => {
  try {
    const result = await ProductModel.createProduct(req.body);
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
router.put("/:id", async (req, res) => {
  try {
    const result = await ProductModel.updateProduct(req.params.id, req.body);
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
router.delete("/:id", async (req, res) => {
  try {
    await ProductModel.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;