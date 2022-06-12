const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @description - Get all products
 * @route   GET api/products
 * @access  Public
 * @returns {Array} - Array of products
 */
router.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @description: Get product by id
 * @route   GET api/products/:id
 * @access  Public
 * @returns {object}
 */
router.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { category: true },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @description: Post New product
 * @route   POST api/products
 * @access  Public
 * @param req
 */
router.post("/products", async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await prisma.product.create({
      data: data,
    });
    res.json({ message: "Product successfully created!", newProduct });
  } catch (error) {
    next(error);
  }
});

/**
 * @description - Update a product
 * @param req - Request object
 * @access  Public
 * @returns {object} - Product object
 */
router.patch("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: { category: true },
    });
    res.json({ message: "Product successfully updated!", updateProduct });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Delete a product
 * @param id
 * @access  Public
 * @returns {object} - Product object
 */
router.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Product successfully deleted!" });
  } catch (error) {
    next(error);
  }
});

//============Category==============//
/**
 * @description - Get all categories
 * @route GET /api/category
 * @access  Public
 *
 */
router.get("/category", async (req, res) => {
  try {
    const _category = await prisma.category.findMany({
      include: { products: true },
    });
    res.json(_category);
  } catch (error) {
    next(error);
  }
});

/**
 * @description - Get category by id
 * @route GET /api/category/:id
 * @param { id } req - request object
 * @access  Public
 */
router.get("/category/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { products: true },
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

/**
 * @description - Post New category
 * @route POST /api/category
 * @param { req } req - request object
 * @access  Public
 */
router.post("/category", async (req, res, next) => {
  try {
    const data = req.body;
    const newCategory = await prisma.category.create({
      data: data,
    });
    res.json({ message: "Category successfully created!", newCategory });
  } catch (error) {
    next(error);
  }
});

/**
 * @description - Create category
 * @route POST /api/category
 * @param req - request object
 * @access  Public
 */
router.patch("/category/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res.json({ message: "Category successfully updated!", updateCategory });
  } catch (error) {
    next(error);
  }
});

/**
 * @description - Delete category
 * @route DELETE /api/category/:id
 * @param { id } req - request object
 * @access  Public
 */
router.delete("/category/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Category successfully deleted!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
