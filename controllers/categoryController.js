const Category = require("../models/category");
const { body, validationResult, sanitizeBody } = require("express-validator");

// categories list
exports.category_list = (req, res, next) => {
  // find all categories and sort by name
  Category.find()
    .sort([["name", "ascending"]])
    .then((list_categories) => {
      // successfull so render
      res.render("category_list", {
        title: "Category list",
        category_list: list_categories,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

// category detail
exports.category_detail = (req, res, next) => {
  //find the target category
  Category.findById(req.params.id)
    .then((results) => {
      if (results === null) {
        // No results.
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      //successfull so render
      res.render("category_detail", {
        title: "Category Detail",
        name: results.name,
        description: results.description,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

// render create form
exports.category_create_GET = (req, res) => {
  res.render("category_form", { title: "Create Category", errors: null });
};

// handle creation form
exports.category_create_POST = [
  //  validate and sanitize data
  body("name", "Name is required!").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    // extract errors from the middleware
    const errors = validationResult(req);
    // create a new object with validated data
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Category",
        category,
        errors: errors.array(),
      });
      return;
    } else {
      // checks if genre with same name exists
      Category.findOne({ name: req.body.name })
        .then((found_category) => {
          if (found_category) {
            // if exists, redirect to its detail page
            res.redirect(found_category.url);
          } else {
            // else, salve category and redirect to its url
            category.save();
            res.redirect(category.url);
          }
        })
        .catch((err) => {
          return next(err);
        });
    }
  },
];

exports.category_update_GET = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update GET");
};

exports.category_update_POST = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update POST");
};

exports.category_delete_GET = (req, res) => {
  res.send("NOT IMPLEMENTED: Category index GET");
};

exports.category_delete_POST = (req, res) => {
  res.send("NOT IMPLEMENTED: Category index GET");
};
