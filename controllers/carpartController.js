const Category = require("../models/category");
const CarPart = require("../models/carpart");
const { body, validationResult, sanitizeBody } = require("express-validator");
const category = require("../models/category");

// store home page
exports.carpart_index = (req, res) => {
  res.render("index", { title: "test store" });
};

// car parts list
exports.carpart_list = (req, res, next) => {
  //find all car parts
  CarPart.find()
    .sort([["name", "ascending"]])
    .then((list_carparts) => {
      // successfull so render
      res.render("carpart_list", {
        title: "Car Part list",
        carpart_list: list_carparts,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

// car part detail
exports.carpart_detail = (req, res, next) => {
  //find the target car part
  CarPart.findById(req.params.id)
    .populate("category")
    .then((results) => {
      if (results === null) {
        // No results.
        const err = new Error("Car Part not found");
        err.status = 404;
        return next(err);
      }
      //sucessfull so render
      res.render("carpart_detail", {
        title: "Car Part Detail",
        name: results.name,
        price: results.price,
        description: results.description,
        category: results.category.name,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

// render create form
exports.carpart_create_GET = (req, res, next) => {
  //find category to be checked in car part creation
  Category.find()
    .sort([["name", "ascending"]])
    .then((results) => {
      //sucessfull so render
      res.render("carpart_form", {
        title: "Create Car Part",
        categories: results,
        carpart: {},
        errors: null,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

// handle creation form
exports.carpart_create_POST = [
  //  validate and sanitize data
  body("name", "Name is required!").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must be a decimal number")
    .notEmpty()
    .isDecimal()
    .toFloat(),
  body("category.*").escape(),

  (req, res, next) => {
    //extract errors from middleware
    const errors = validationResult(req);
    //create new object with validated data
    const carpart = new CarPart({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    });
    if (!errors.isEmpty()) {
      //there are errors, render form again with sanitized values and error messages
      Category.find()
        .sort([["name", "ascending"]])
        .then((results) => {
          // Mark our selected categories as checked.
          for (const category of results.genres) {
            if (carpart.category.includes(category._id)) {
              category.checked = "true";
            }
          }
          //sucessfull so render
          res.render("carpart_form", {
            title: "Create Car Part",
            categories: results,
            carpart: {},
            errors: errors.array(),
          });
        })
        .catch((err) => {
          return next(err);
        });
      return;
    }
    carpart.save();
    res.redirect(carpart.url);
  },
];

exports.carpart_update_GET = (req, res) => {
  res.send("NOT IMPLEMENTED: CarPart update GET");
};

exports.carpart_update_POST = (req, res) => {
  res.send("NOT IMPLEMENTED: CarPart update POST");
};

exports.carpart_delete_GET = (req, res) => {
  res.send("NOT IMPLEMENTED: CarPart index GET");
};

exports.carpart_delete_POST = (req, res) => {
  res.send("NOT IMPLEMENTED: CarPart index GET");
};
