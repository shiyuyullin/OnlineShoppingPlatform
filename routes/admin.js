const express = require("express");
const { body } = require("express-validator");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  isAuth,
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Title of a product has to contain at least 3 characters"),
    body("imageUrl").isURL().withMessage("Please enter a valid URL"),
    body("price")
      .isNumeric()
      .withMessage("Price of a product has to be a number"),
    body("description")
      .isLength({ min: 5 })
      .withMessage(
        "Description of a product has to contain at least 5 characters"
      ),
  ],
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  isAuth,
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Title of a product has to contain at least 3 characters"),
    body("imageUrl").isURL().withMessage("Please enter a valid URL"),
    body("price")
      .isNumeric()
      .withMessage("Price of a product has to be a number"),
    body("description")
      .isLength({ min: 5 })
      .withMessage(
        "Description of a product has to contain at least 5 characters"
      ),
  ],
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
