const { Router } = require('express');
const TableController = require('../controllers/TableController');

const router = Router();

router.get('/:tableId', TableController.getTable);
router.post('', TableController.createTable);
router.delete('/:tableId', TableController.deleteTable);

module.exports = router;