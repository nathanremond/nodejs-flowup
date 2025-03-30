const express = require("express");
const router = express.Router();
const RequestModel = require("../models/requestModel");

/**
 * @swagger
 * /user/{id_user}/request:
 *   get:
 *     summary: Get requests by user ID
 *     tags: [Requests]
 *     parameters:
 *       - name: id_user
 *         in: path
 *         required: true
 *         description: The ID of the user
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
router.get("/user/:id_user/request", async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const result = await RequestModel.getByUser(
      id_user
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


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
router.post("/request", async (req, res) => {
  try {
    const result = await RequestModel.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;