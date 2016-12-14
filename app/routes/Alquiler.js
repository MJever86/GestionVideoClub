var express = require('express');
var router = express.Router();
var mysql=require('mysql')

var controladorAlquiler = require('../controllers/Alquiler'); 


//get alquiler
router.get('/',controladorAlquiler.getAlquiler)
router.get('/:dni',controladorAlquiler.getAlquilerDni)

//post alquiler
router.post('/',controladorAlquiler.postAlquiler)

//delete alquiler
router.delete('/:titulo_pelicula/:dni_cliente/:fecha_alquiler/:fecha_entrega',controladorAlquiler.deleteAlquiler)

//update alquiler
router.put('/:dni_cliente/:titulo_pelicula/:fecha_alquiler/:fecha_entrega',controladorAlquiler.putAlquiler)

//get numero de alquileres
router.get('/numeroAlquileres/:titulo',controladorAlquiler.getNumeroAlquileres)

module.exports = router;