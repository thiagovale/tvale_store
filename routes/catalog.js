const express = require("express");
const router = express.Router();

const carpart_controller = require("../controllers/carpartController");
const category_controller = require("../controllers/categoryController");

router.get("/", carpart_controller.carpart_index);

//carpart routes code here

//categories routes
router.get("/categories", category_controller.category_list);

module.exports = router;
