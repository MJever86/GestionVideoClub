//GET de Alquiler
module.exports.getAlquiler = function(req, res){ 
    var db=req.db;
    db.query('SELECT * from Alquiler', function(err, datos, fields) {
        if (err) throw err;
            res.json(datos)
    });
};  

//GET de Alquiler con busqueda por dni
module.exports.getAlquilerDni = function(req, res){ 
    var db=req.db;
    db.query('SELECT * from Alquiler where dni_cliente=?',[req.params.dni], function(err, datos, fields) {
        if (err) throw err;
            res.json(datos)
    });
}; 

//Post de Alquiler
module.exports.postAlquiler = function(req, res){ 
    var db=req.db;
    if(req.body.titulo_pelicula && req.body.dni_cliente && req.body.fecha_entrega && req.body.fecha_alquiler){
        db.query('insert into Alquiler set ?',[req.body], function(err, datos, fields) {
            if (err) res.status(500).json({"err":"se ha producido un error al realizar el alquiler"})
            else
                res.status(201).json({"messagge":"el alquiler se ha realizado correctamente"})
        });
    }else{
        res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
    }
};  
//en el post le hemos quitado el throw, para que cuando se cree una pelicula existente no caiga el servidor
//y en este caso nos devuelve el error 500 y nos muestra el mensaje correspondiente pero el servidor sigue en pie.

//Delete Alquiler
module.exports.deleteAlquiler = function(req, res){ 
    var db=req.db;
    db.query('delete from Alquiler where titulo_pelicula=? and dni_cliente=? and fecha_alquiler like ?"%" and fecha_entrega like ?"%"',[req.params.titulo_pelicula,req.params.dni_cliente,req.params.fecha_alquiler,req.params.fecha_entrega], function(err, datos, fields) {
        if (err) throw err;
        if(datos.affectedRows>0)
            res.json({"messagge":"el alquiler se ha eliminado correctamente"})
        else
            res.json({"messagge":"el alquiler no existe en la base de datos"})
    });
}; 

//Update Alquiler
module.exports.putAlquiler = function(req, res){ 
    var db=req.db;
    if(req.body.titulo_pelicula && req.body.dni_cliente && req.body.fecha_entrega && req.body.fecha_alquiler){
        db.query('update Alquiler set ? where dni_cliente = ? and titulo_pelicula = ? and fecha_alquiler like ?"%" and fecha_entrega like ?"%"',[req.body,req.params.dni_cliente,req.params.titulo_pelicula,req.params.fecha_alquiler,req.params.fecha_entrega], function(err, datos, fields) {
            if (err) {
                res.status(500).json({"err":"No ha sido posible realizar el alquiler de la pelicula"})
            }else{
                res.json({"mesagge":"el alquiler se ha actualizado correctamente"})
            }
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
    db.query('SELECT alquiler_pelicula(?)',[req.params.titulo], function(err, datos, fields) {
        if (err) res.status(500).json({"err":"se ha producido un error interno"});
        else{
            datos= JSON.stringify(datos).replace(/alquiler_pelicula\(\'\w+\'\)/i,'alquiler_pelicula'); //cuando coincida el patron lo cambiamos por la clave alquiler_pelicula
            datos=JSON.parse(datos);
            res.json({"message":"La pelicula se ha alquilado "+datos[0].alquiler_pelicula+" veces"});
        }
    });
};  