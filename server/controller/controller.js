const { isObjectIdOrHexString } = require("mongoose");
var Propertydb = require("../model/model");

const dbGeneralError = "There was an error in database";

exports.create = (req, res) => {
  const property = new Propertydb({
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    daily_price: req.body.daily_price,
    addess: req.body.address,
    location: req.body.location,
  });

  property
    .save(property)
    .then((data) => {
      // res.redirect("/add-property");
      // req.io.emit("add_row", data);
      res.json({ success: 1 }, 200);
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};

exports.find = (req, res) => {
  if (req.params.id) {
    console.log(req.params);
    const id = req.params.id;
    Propertydb.findById(id)
      .then((property) => {
        if (!property) {
          res
            .status(404)
            .send({
              message: "Couldn't find a property with the specified id",
            });
        }
        res.send(property);
      })
      .catch((e) =>
        res.status(500).send({ message: e.message || dbGeneralError })
      );
  } else {
    Propertydb.find()
      .then((property) => {
        res.send(property);
      })
      .catch((e) =>
        res.status(500).send({ message: e.message || dbGeneralError })
      );
  }
};

exports.update = (req, res) => {
  const id = req.body.id;
  Propertydb.findByIdAndUpdate(id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Couldn't find a property with the specified id" });
      } else {
        res.send(data);
        // req.io.emit("update_row", { id: id, row: req.body });
      }
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Propertydb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Couldn't find a property with the specified id" });
      } else {
        // req.io.emit("deleted_id", id);
        res.send({ message: "property was deleted successfully" });
      }
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};
