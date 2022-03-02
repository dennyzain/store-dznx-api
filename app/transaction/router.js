var express = require('express');
var router = express.Router();
const { index, actionStatus } = require('./controller');
const { isLoginAdmin } = require('../middlewares/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.put('/edit/:id', actionStatus);

module.exports = router;
