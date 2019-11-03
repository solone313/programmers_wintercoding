const { Router } = require('express');
const TableController = require('../controllers/TableController');

const router = Router();

router.post('', TableController.createTable);

module.exports = router;