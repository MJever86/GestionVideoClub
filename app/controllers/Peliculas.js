var pelicula=require('../models/pelicula');

//GET de todas las peliculas
module.exports.getPeliculas = function(req, res){ 
    pelicula.getPeliculas(function(datos){
        res.json(datos);
    });
};  

//GET de una pelicula
module.exports.getPeliculasTitulo = function(req, res){ 
    var titulo=req.params.titulo;
    pelicula.getPeliculasTitulo(titulo,function(datos){
        res.json(datos);
    });
};  

//Post de pelicula
module.exports.postPeliculas = function(req, res){ 
    var body=req.body;
    if(req.body.titulo && req.body.director && req.body.año){
        pelicula.postPeliculas(body,function(datos){
            var codigo=datos.code;
            res.status(codigo).json({"messagge":datos.messagge});
        });
    }else{
        res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
    }
};  
/**en el post le hemos quitado el throw, para que cuando se cree una pelicula existente no caiga el servidor
 * y en este caso nos devuelve el error 500 y nos muestra el mensaje correspondiente pero el servidor sigue en pie.*/


//Delete peliculas
module.exports.deletePeliculas = function(req, res){
    var titulo=req.params.titulo;
  pelicula.deletePeliculas(titulo,function(datos){
      if(datos.affectedRows>0)
            res.json({"messagge":"la pelicula se ha eliminado correctamente"})
        else
            res.json({"messagge":"la pelicula no existe en la base de datos"})
  });
};  
/**en el delete hemos modificado para que cuando obtenemos los datos del json, comprobaremos si las 
 * filas modificadas, si son mas de una es que la hemos borrado correctamente y son 0 es que la pelicula no existia en la base de datos.*/

//Update pelicula
module.exports.putPeliculas = function(req, res){ 
    var body=req.body;
    var titulo=req.params.titulo;
    if(req.body.titulo && req.body.director && req.body.año){
        pelicula.putPeliculas(body,titulo,function(datos){
            var codigo=datos.code;
            res.status(codigo).json({"messagge":datos.messagge});
        });
    }else{
        res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
    }
}; 
//con el put pasa lo mismo que con el post.