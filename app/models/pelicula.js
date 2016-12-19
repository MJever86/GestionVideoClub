var db=require('./db');

//GET de todas las peliculas
module.exports.getPeliculas = function(callback){ 
    db.query('SELECT * from Peliculas', function(err, datos, fields) {
        if (err) throw err;
        callback(datos)
    });
};

//GET de una pelicula
module.exports.getPeliculasTitulo = function(titulo,callback){ 
    db.query('SELECT * from Peliculas where titulo=?',[titulo], function(err, datos, fields) {
        if (err) throw err;
        callback(datos)
    });
}; 

//Post de pelicula
module.exports.postPeliculas = function(pelicula, callback){ 
    db.query('insert into Peliculas set ?',[pelicula], function(err, datos, fields) {
        if (err) callback({"messagge":"se ha producido un error al insertar la pelicula en la base de datos","code":500})
        else
            callback({"messagge":"la pelicula se ha insertado correctamente en la base de datos","code":201})
    });
};  

//Delete peliculas
module.exports.deletePeliculas = function(titulo,callback){ 
    db.query('delete from Peliculas where titulo=?',[titulo], function(err, datos, fields) {
        if (err) throw err;
        callback(datos);
    });
};

//Update pelicula
module.exports.putPeliculas = function(pelicula,titulo,callback){ 
    db.query('update Peliculas set ? where titulo = ?',[pelicula,titulo], function(err, datos, fields) {
        if (err) callback({"messagge":"no ha sido posible actualizar la pelicula","code":500})
        else
            callback({"messagge":"la pelicula se ha actualizado correctamente","code":200})
    });
}; 