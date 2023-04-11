const express = require("express");
const router = express.Router();

const carpart_controller = require("../controllers/carpartController");
const category_controller = require("../controllers/categoryController");

// home page route
router.get("/", carpart_controller.carpart_index);

/// car parts routes ///

// view all car parts
router.get("/carparts", carpart_controller.carpart_list);

//view car part creation form
router.get("/carpart/create", carpart_controller.carpart_create_GET);

//handle form data
router.post("/carpart/create", carpart_controller.carpart_create_POST);

//view car part detail
router.get("/carpart/:id", carpart_controller.carpart_detail);

/// categories routes ///

// view all categories
router.get("/categories", category_controller.category_list);

//view category creation form
router.get("/category/create", category_controller.category_create_GET);

//handle form data
router.post("/category/create", category_controller.category_create_POST);

//view category detail
router.get("/category/:id", category_controller.category_detail);

module.exports = router;
