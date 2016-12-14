var express = require('express');
var router = express.Router();
var mysql=require('mysql')

var controladorAlquiler = require('../controllers/Alquiler'); 

//get numero de alquileres
router.get('/:titulo',controladorAlquiler.getNumeroAlquileres)

module.exports = router;