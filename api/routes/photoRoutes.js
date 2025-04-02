const express = require("express");
const router = express.Router();
const PhotoModel = require("../models/PhotoModel");

/**
 * @swagger
 * /product/{id_product}/photo:
 *   get:
 *     summary: Get photos by product ID
 *     tags: [Photos]
 *     parameters:
 *       - name: id_product
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
router.get("/product/:id_product/photo", async (req, res) => {
  try {
    const id_product = req.params.id_product;
    const result = await PhotoModel.getByProduct(id_product);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
