const express = require("express");
const router = express.Router();
const RequestModel = require("../models/requestModel");

/**
 * @swagger
 * /request:
 *   post:
 *     summary: Create a request
 *     tags: [Requests]
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: Informations of the request
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
    const result = await RequestModel.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;