const express = require("express");
const router = express.Router();
const CategoryModel = require("../models/categoryModel");

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get a list of all categories
 *     tags: [Categories]
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
      const categories = await CategoryModel.getAllCategories();
      res.status(200).json(categories);
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
});


/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
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
router.get("/:id", async (req, res) => {
  try {
    const id = req.params["id"];
      const category = await CategoryModel.getCategoryById(id);
      res.status(200).json(category);
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
});

module.exports = router;
