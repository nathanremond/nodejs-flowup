const express = require("express");
const router = express.Router();
const bestSellsModel = require("../models/sells/bestSellsModel");

/**
 * @swagger
 * /bestSells:
 *   get:
 *     summary: Get a list of all best sells
 *     tags: [Best Sells]
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
    const result = await bestSellsModel.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
