var express = require('express');
var router = express.Router();
// Create a new permit
router.post("/", tutorials.create);

// Retrieve all permit
router.get("/", tutorials.findAll);

// Retrieve a single permit with id
router.get("/:id", tutorials.findOne);

// Update a permit with id
router.put("/:id", tutorials.update);

// Delete a permit with id
router.delete("/:id", tutorials.delete);


module.exports = router;
