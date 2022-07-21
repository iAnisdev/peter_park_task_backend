var express = require('express');
const { body } = require('express-validator');
const Permit = require('../controllers/permits.controller.js');
var router = express.Router();
// Create a new permit
router.post("/", 
body('country').exists().withMessage('Country Required for permit'),
body('licence').exists().withMessage('Licence Required for permit'),
body('startDate').exists().withMessage('Start Date Required for permit'),
body('endDate').exists().withMessage('End Date Required for permit'), Permit.create);

// Retrieve all permit
router.get("/", Permit.findAll);

// Retrieve a single permit with id
router.get("/:id", Permit.findOne);

// Update a permit with id
router.put("/:id", Permit.update);

// Delete a permit with id
router.delete("/:id", Permit.delete);


module.exports = router;
