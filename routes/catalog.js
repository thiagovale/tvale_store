const express = require("express");
const router = express.Router();

const carpart_controller = require("../controllers/carpartController");
const category_controller = require("../controllers/categoryController");

//home page route
router.get("/", carpart_controller.carpart_index);

//car parts
//view all car parts
router.get("/carparts", carpart_controller.carpart_read_GET);

//categories
//view all categories
router.get("/categories", category_controller.category_read_GET);

module.exports = router;
