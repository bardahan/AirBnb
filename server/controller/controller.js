const { isObjectIdOrHexString } = require("mongoose");
var { PropertySchema, UsersSchema, ChargesSchema } = require("../model/model");
var { getGeoCodeByAddress } = require("../model/googleMaps");
const dbGeneralError = "There was an error in database";

// Properties

exports.create = async (req, res) => {
  const property = new PropertySchema({
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    daily_price: req.body.daily_price,
    addess: req.body.address,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    country: req.body.country,
    address: req.body.address,
    guestCount: req.body.guestCount,
    propertyImageLink: req.body.propertyImageLink,
  });

  if (!(property.latitude || property.longitude)) {
    const geocode = await getGeoCodeByAddress(property.address);
    property.longitude = geocode.lng;
    property.latitude = geocode.lat;
  }
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
    const id = req.params.id;
    PropertySchema.findById(id)
      .then((property) => {
        if (!property) {
          res.status(404).send({
            message: "Couldn't find a property with the specified id",
          });
          return;
        }
        res.send(property);
      })
      .catch((e) =>
        res.status(500).send({ message: e.message || dbGeneralError })
      );
  } else {
    PropertySchema.find()
      .then((property) => {
        res.send(property);
      })
      .catch((e) =>
        res.status(500).send({ message: e.message || dbGeneralError })
      );
  }
};

exports.findByCountry = (req, res) => {
  const country = req.params.country;
  PropertySchema.find({ country: country })
    .then((property) => {
      if (!property) {
        res.status(404).send({
          message: "Couldn't find a property with the specified id",
        });
        return;
      }
      res.send(property);
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};

exports.searchProperty = (req, res) => {
  const country = req.query.country;
  const guestCount = req.query.guestCount;
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;
  PropertySchema.aggregate([
    {
      $lookup: {
        from: "chargesSchema",
        localField: "_id",
        foreignField: "propertyId",
        as: "propertySchema",
      },
    },
  ])
    .then((property) => {
      console.log(property);
      if (!property) {
        res.status(404).send({
          message: "Couldn't find a property with the specified id",
        });
        return;
      }
      res.send(property);
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};

exports.update = (req, res) => {
  const id = req.body.id;
  PropertySchema.findByIdAndUpdate(id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Couldn't find a property with the specified id" });
        return;
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
  PropertySchema.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Couldn't find a property with the specified id" });
        return;
      } else {
        // req.io.emit("deleted_id", id);
        res.send({ message: "property was deleted successfully" });
      }
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};

// Users

exports.createUser = (req, res) => {
  const user = new UsersSchema({
    username: req.body.username,
    password: req.body.password,
    privileges: req.body.privileges,
  });

  user
    .save(user)
    .then((data) => {
      // res.redirect("/add-property");
      // req.io.emit("add_row", data);
      res.json({ success: 1 }, 200);
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};

exports.authentcateUser = (req, res) => {
  if (req.params.username && req.params.password) {
    const authentication = {
      username: req.params.username,
      password: req.params.password,
    };
    UsersSchema.find({
      username: authentication.username,
      password: authentication.password,
    })
      .then((user) => {
        if (user === undefined || user.length == 0) {
          res.status(404).send({
            message:
              "Couldn't find a user with the specified username and password combination",
          });
          return;
        }
        res.send({
          success: true,
          privileges: user[0].privileges,
          userId: user[0].id,
        });
      })
      .catch((e) =>
        res.status(500).send({ message: e.message || dbGeneralError })
      );
  } else {
    res.status(404).send("Authentication request error");
  }
};

exports.deleteUser = (req, res) => {
  const username = req.params.username;
  UsersSchema.findOneAndDelete({ username: username }).then((user) => {
    if (!user) {
      res.status(404).send({
        message: "Couldn't find user",
      });
      return;
    } else {
      res.send({ success: true, user: user });
    }
  });
};

// Charges

const canConvertToDate = (trial) =>
  [String, Date].includes(trial.constructor) && !isNaN(new Date(trial));

exports.createCharge = (req, res) => {
  const charge = new ChargesSchema({
    userId: req.body.userId,
    propertyId: req.body.propertyId,
    amount: req.body.amount,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
  });
  if (
    !(canConvertToDate(charge.dateFrom) || canConvertToDate(charge.dateFrom))
  ) {
    res.status(404).send({
      message:
        "Please provide a valid dateFrom and dateTo. Format 'yyyy-mm-dd'",
    });
  }
  charge
    .save(charge)
    .then((data) => {
      // res.redirect("/add-property");
      // req.io.emit("add_row", data);
      res.json({ success: 1 }, 200);
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};

exports.findCharges = (req, res) => {
  console.log(req);
  if (req.query.userId) {
    const userId = req.params.userId;
    ChargesSchema.find({ userId: userId })
      .then((charge) => {
        if (!charge) {
          res.status(404).send({
            message: "Couldn't find charges for specified userId",
          });
          return;
        }
        res.send(charge);
      })
      .catch((e) =>
        res.status(500).send({ message: e.message || dbGeneralError })
      );
  } else if (req.query.propertyId) {
    const propertyId = req.query.propertyId;
    ChargesSchema.find({ propertyId: propertyId })
      .then((charges) => {
        if (charges.length < 1) {
          res.status(404).send({
            message: "Couldn't find charges for specified propertyId",
          });
          return;
        }
        res.send(charges);
      })
      .catch((e) =>
        res.status(500).send({ message: e.message || dbGeneralError })
      );
  } else {
    ChargesSchema.find()
      .then((charge) => {
        res.send(charge);
      })
      .catch((e) =>
        res.status(500).send({ message: e.message || dbGeneralError })
      );
  }
};

exports.deleteCharge = (req, res) => {
  const id = req.params.id;
  ChargesSchema.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Couldn't find a charge with the specified id" });
        return;
      } else {
        // req.io.emit("deleted_id", id);
        res.send({ success: true, charge: data });
      }
    })
    .catch((e) =>
      res.status(500).send({ message: e.message || dbGeneralError })
    );
};
