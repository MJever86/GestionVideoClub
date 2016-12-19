var alquiler=require('../models/alquiler');

//GET de Alquiler
module.exports.getAlquiler = function(req, res){ 
    alquiler.getAlquiler(function(datos){
        res.json(datos);
    });
};  

//GET de Alquiler con busqueda por dni
module.exports.getAlquilerDni = function(req, res){ 
    var dni=req.params.dni;
    alquiler.getAlquilerDni(dni,function(datos){
         res.json(datos);
    })

}; 

//Post de Alquiler
module.exports.postAlquiler = function(req, res){ 
    var body=req.body;
    if(req.body.titulo_pelicula && req.body.dni_cliente && req.body.fecha_entrega && req.body.fecha_alquiler){
        alquiler.postAlquiler(body,function(datos){
            var codigo=datos.code;
            res.status(codigo).json({"messagge":datos.messagge})
        });
    }else{
        res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
    }
};  
//en el post le hemos quitado el throw, para que cuando se cree una pelicula existente no caiga el servidor
//y en este caso nos devuelve el error 500 y nos muestra el mensaje correspondiente pero el servidor sigue en pie.

//Delete Alquiler
module.exports.deleteAlquiler = function(req, res){ 
  var parametros=req.params;
  alquiler.deleteAlquiler(parametros,function(datos){
        if(datos.affectedRows>0)
            res.json({"messagge":"el alquiler se ha eliminado correctamente"});
        else
            res.json({"messagge":"el alquiler no existe en la base de datos"});
  });
}; 

//Update Alquiler
module.exports.putAlquiler = function(req, res){ 
    if(req.body.titulo_pelicula && req.body.dni_cliente && req.body.fecha_entrega && req.body.fecha_alquiler){
        var body=req.body
        var parametros=req.params;
        alquiler.putAlquiler(body,parametros,function(datos){
            var codigo=datos.code;
            res.status(codigo).json({"messagge":datos.messagge});
        });
  }else{
      res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
  }
};
//en el delete hemos modificado para que cuando obtenemos los datos del json, comprobaremos si las 
//filas modificadas, si son mas de una es que la hemos borrado correctamente y son 0 es que la pelicula no existia en la base de datos.

//Get Numero de alquileres
module.exports.getNumeroAlquileres = function(req, res){ 
    var db=req.db;
    var titulo=req.params.titulo;
    alquiler.getNumeroAlquileres(titulo,function(datos){
        var codigo=datos.code;
        res.status(codigo).json({"messagge":datos.messagge});
    });
};  