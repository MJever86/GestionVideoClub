var express = require('express');
var router = express.Router();
var mysql=require('mysql')

var controladorPeliculas = require('../controllers/Peliculas'); 

//get peliculas
router.get('/',controladorPeliculas.getPeliculas)
router.get('/:titulo',controladorPeliculas.getPeliculasTitulo)

//post peliculas
router.post('/',controladorPeliculas.postPeliculas)

//delete peliculas
router.delete('/:titulo',controladorPeliculas.deletePeliculas)

//update peliculas
router.put('/:titulo',controladorPeliculas.putPeliculas)

module.exports = router;