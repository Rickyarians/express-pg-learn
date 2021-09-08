var express = require('express');
var router = express.Router();
const db = require('./../models')

/* GET users listing. */
router.get('/', db.getAllUsers);
router.get('/:id', db.getUserById);
router.post('/', db.addUser);
router.delete('/:id', db.deleteUser)

module.exports = router;
