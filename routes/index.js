//IN FIRST NUMBER I HAVE CREATED THE ROUTER
const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');


console.log('router loaded');
router.get('/',homeController.home);
router.get('/raw',homeController.raw);


module.exports = router;