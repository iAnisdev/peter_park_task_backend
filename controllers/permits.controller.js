const db = require("../models");
const { validationResult } = require('express-validator');
const Permits = db.permits;
const Op = db.Sequelize.Op;

// Create and Save a new permit
exports.create = (req, res) => {
  // Validate request
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  // Save Permit in the database
  Permits.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Permit."
      });
    });
};

// Retrieve all Permits from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Permits.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Permits."
      });
    });
};

// Find a single Permits with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Permits.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Permits with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Permits with id=" + id
      });
    });
};

// Update a Permit by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Permits.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Permit was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Permit with id=${id}. Maybe Permits was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Permit with id=" + id
      });
    });
};

// Delete a Permit with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Permits.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Permit was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Permit with id=${id}. Maybe Permit was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Permit with id=" + id
      });
    });
};
