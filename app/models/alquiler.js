var db=require('./db');

//GET de Alquiler
module.exports.getAlquiler = function(callback){ 
    db.query('SELECT * from Alquiler', function(err, datos, fields) {
        if (err) throw err;
        callback(datos)
    });
};  

//GET de Alquiler con busqueda por dni
module.exports.getAlquilerDni = function(dni,callback){ 
    db.query('SELECT * from Alquiler where dni_cliente=?',[dni], function(err, datos, fields) {
        if (err) throw err;
        callback(datos);
    });
};

//Post de Alquiler
module.exports.postAlquiler = function(alquiler,callback){ 
    db.query('insert into Alquiler set ?',[alquiler], function(err, datos, fields) {
        if (err) callback({"messagge":"se ha producido un error al realizar el alquiler","code":500});
        else
            callback({"messagge":"el alquiler se ha realizado correctamente","code":201});
    });
}; 

//Delete Alquiler
module.exports.deleteAlquiler = function(alquiler,callback){ 
    db.query('delete from Alquiler where titulo_pelicula=? and dni_cliente=? and fecha_alquiler like ?"%" and fecha_entrega like ?"%"',[alquiler.titulo_pelicula,alquiler.dni_cliente,alquiler.fecha_alquiler,alquiler.fecha_entrega], function(err, datos, fields) {
        if (err) throw err;
        else
            callback(datos);
    });
}; 

//Update Alquiler
module.exports.putAlquiler = function(alquiler,parametros,callback){
    db.query('update Alquiler set ? where dni_cliente = ? and titulo_pelicula = ? and fecha_alquiler like ?"%" and fecha_entrega like ?"%"',[alquiler,parametros.dni_cliente,parametros.titulo_pelicula,parametros.fecha_alquiler,parametros.fecha_entrega], function(err, datos, fields) {
        if (err) {
            callback({"messagge":"No ha sido posible realizar el alquiler de la pelicula","code":500})
        }else{
            callback({"messagge":"el alquiler se ha actualizado correctamente","code":200})
        }
    });
};

module.exports.getNumeroAlquileres = function(titulo,callback){ 
    db.query('SELECT alquiler_pelicula(?)',[titulo], function(err, datos, fields) {
        if (err) callback({"messagge":"se ha producido un error interno","code":500}); 
        else{
            datos= JSON.stringify(datos).replace(/alquiler_pelicula\(\'\w+\W*\w*\'\)/i,'alquiler_pelicula'); //cuando coincida el patron lo cambiamos por la clave alquiler_pelicula
            datos=JSON.parse(datos);
            callback({"messagge":"La pelicula se ha alquilado "+datos[0].alquiler_pelicula+" veces","code":200});
        }
    });
};  