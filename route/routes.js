const express = require('express');
const router = express.Router();
const studentController = require('../src/studentController');

// Routes
router.post('/student/login', studentController.loginUserControllerFn);
router.post('/student/create', studentController.createStudentControllerFn);
router.get('/userDetails', studentController.getUserDetailsControllerFn);
router.post('/saveLoginTime', studentController.saveLoginTimeControllerFn);
router.post('/saveLogoutTime', studentController.saveLogoutTimeControllerFn);
router.post('/saveLogoutdate', studentController.saveLogoutdateControllerFn);
router.post('/savecheckintm', studentController.savecheckintmControllerFn);
router.post('/savecheckout', studentController.savecheckoutControllerFn);
router.post('/savecheckindate', studentController.savecheckindateControllerFn);

module.exports = router;
