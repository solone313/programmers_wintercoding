const { Router } = require('express');
const CourseController = require('../controllers/CourseController');

const router = Router();

router.get('/course/:code', CourseController.getCourse);
router.get('/search', CourseController.getSearchData);

module.exports = router;