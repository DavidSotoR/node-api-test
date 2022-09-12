var express = require('express');
var router = express.Router();
const checkInDayController = require('../controllers/checkinController')

router.post('/checkin/:id/init', (req, res, next) => {
    checkInDayController.checkInitDay
});

router.put('/checkin/:id/end', (req, res, next) => {
    checkInDayController.checkEndDay
});

module.exports = router;