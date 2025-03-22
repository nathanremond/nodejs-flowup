const express = require("express");
const router = express.Router();
const PerformanceModel = require("../models/performanceModel");

/**
 * @swagger
 * /product/{id_product}/performance:
 *   get:
 *     summary: Get performances by product ID
 *     tags: [Performances]
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
router.get("/product/:id_product/performance", async (req, res) => {
  try {
    const id_product = req.params.id_product;
    const result = await PerformanceModel.getByProduct(
        id_product
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
