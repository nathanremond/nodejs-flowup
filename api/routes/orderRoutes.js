const express = require("express");
const router = express.Router();
const OrderModel = require("../models/orderModel");

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create an order
 *     tags: [Orders]
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: Informations of the order
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
    const result = await OrderModel.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;