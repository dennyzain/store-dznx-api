var express = require('express');
var router = express.Router();
const { viewSignIn, actionSignin, actionSingOut } = require('./controller');

router.get('/', viewSignIn);
router.post('/', actionSignin);
router.put('/logout', actionSingOut);

module.exports = router;
