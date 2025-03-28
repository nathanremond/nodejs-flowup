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
 *           type: object
 *           properties:
 *            total_amount:
 *             type: number
 *            ordered_products:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id_product:
 *                    type: number
 *                  quantity:
 *                    type: number
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
router.post("/order", async (req, res) => {
  try {
    const result = await OrderModel.create(req.body, req.user.id_user);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;