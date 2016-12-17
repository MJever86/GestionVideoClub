//GET de todas las peliculas
module.exports.getPeliculas = function(req, res){ 
    var db=req.db;
    db.query('SELECT * from Peliculas', function(err, datos, fields) {
        if (err) throw err;
            res.json(datos)
    });
};  

//GET de una pelicula
module.exports.getPeliculasTitulo = function(req, res){ 
    var db=req.db;
    db.query('SELECT * from Peliculas where titulo=?',[req.params.titulo], function(err, datos, fields) {
        if (err) throw err;
            res.json(datos)
    });
};  

//Post de pelicula
module.exports.postPeliculas = function(req, res){ 
    var db=req.db;
    if(req.body.titulo && req.body.director && req.body.año){
        db.query('insert into Peliculas set ?',[req.body], function(err, datos, fields) {
            if (err) res.status(500).json({"err":"se ha producido un error al insertar la pelicula en la base de datos"})
            else
                res.status(201).json({"messagge":"la pelicula se ha insertado correctamente en la base de datos"})
        });
    }else{
        res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
    }
};  
/**en el post le hemos quitado el throw, para que cuando se cree una pelicula existente no caiga el servidor
 * y en este caso nos devuelve el error 500 y nos muestra el mensaje correspondiente pero el servidor sigue en pie.*/


//Delete peliculas
module.exports.deletePeliculas = function(req, res){ 
    var db=req.db;
    db.query('delete from Peliculas where titulo=?',[req.params.titulo], function(err, datos, fields) {
        if (err) throw err;
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
    var db=req.db;
    if(req.body.titulo && req.body.director && req.body.año){
        db.query('update Peliculas set ? where titulo = ?',[req.body,req.params.titulo], function(err, datos, fields) {
            if (err) res.status(500).json({"err":"no ha sido posible actualizar la pelicula"})
            else
                res.json({"mesagge":"la pelicula se ha actualizado correctamente"})
        });
    }else{
        res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
    }
}; 
//con el put pasa lo mismo que con el post.