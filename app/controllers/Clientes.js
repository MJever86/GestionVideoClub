var cliente=require('../models/cliente');


//GET todos los clientes
module.exports.getClientes = function(req, res){ 
    var db=req.db;
    cliente.getClientes(function(datos){
        res.json(datos)
    });
};  

//GET de un cliente
module.exports.getClientesDni = function(req, res){ 
    var dni=req.params.dni;
    cliente.getClientesDni(dni,function(datos){
        res.json(datos);
    });
};  

//POST de Clientes
module.exports.postClientes = function(req, res){ 
    var body=req.body;
    if(req.body.dni && req.body.nombre && req.body.apellidos){
    cliente.postClientes(body,function(datos){
        var codigo=datos.code;
        res.status(codigo).json({"messagge":datos.messagge});
    });
    }else{
        res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
    }
};
/**hemos puesto un if antes del db.query, para que si el dni, nombre y apellidos son validos
 * ejecuta todo el codigo, sino, manda el mensaje de error de que los datos
 * introducidos no son correctos. El codigo 409 indica formato incorrecto
 * Este filtrado lo realizamos en el post y put de clientes, alquiler y peliculas
 */

/**en el post le hemos quitado el throw, para que cuando se cree una pelicula existente no caiga el servidor
 * y en este caso nos devuelve el error 500 y nos muestra el mensaje correspondiente pero el servidor sigue en pie.*/


//DELETE de Clientes
module.exports.deleteClientes = function(req, res){ 
    var dni=req.params.dni;
   cliente.deleteClientes(dni,function(datos){
       if(datos.affectedRows>0)
            res.json({"messagge":"el cliente se ha eliminado correctamente"});
        else
            res.json({"messagge":"el cliente no existe en la base de datos"});
   })
};  
/**en el delete hemos modificado para que cuando obtenemos los datos del json, comprobaremos si las 
 * filas modificadas, si son mas de una es que la hemos borrado correctamente y son 0 es que la pelicula no existia en la base de datos.*/

//UPDATE de Clientes

module.exports.putClientes = function(req, res){ 
    var body=req.body;
    var dni=req.params.dni;
    if(req.body.dni && req.body.nombre && req.body.apellidos){
        cliente.putClientes(dni,body,function(datos){
            var codigo=datos.code;
            res.status(codigo).json({"messagge":datos.messagge})
        });

    }else{
        res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
    }
};  






