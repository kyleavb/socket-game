var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn,(req, res)=>{
    res.render('game')
})

module.exports = router;