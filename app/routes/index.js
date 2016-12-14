var express = require('express');
var router = express.Router();
var mysql=require('mysql')


var controlador = require('../controllers/main'); 



/* GET home page. */ 
router.get('/', controlador.index);



module.exports = router;


