// store home page
exports.carpart_index = (req, res) => {
  res.render("index", { title: "test store" });
};

// car parts list
exports.carpart_read_GET = (req, res) => {
  res.send("NOT IMPLEMENTED: CarPart read GET");
};

//create car part detail

// render create form
exports.carpart_create_GET = (req, res) => {
  res.send("NOT IMPLEMENTED: CarPart create GET");
};

// handle creation form
exports.carpart_create_POST = (req, res) => {
  res.send("NOT IMPLEMENTED: CarPart create POST");
};

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
