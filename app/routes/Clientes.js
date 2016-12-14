var express = require('express');
var router = express.Router();
var mysql=require('mysql')

var controladorClientes = require('../controllers/Clientes'); 

//post clientes
router.post('/',controladorClientes.postClientes)

//get clientes
router.get('/',controladorClientes.getClientes)
router.get('/:dni',controladorClientes.getClientesDni)

//delete clientes
router.delete('/:dni',controladorClientes.deleteClientes)

//update clientes
router.put('/:dni',controladorClientes.putClientes)

module.exports = router;