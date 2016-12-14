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
  db.query('insert into Alquiler set ?',[req.body], function(err, datos, fields) {
  if (err) throw err;
     res.status(201).json(datos)
  });
};  

//Delete Alquiler

module.exports.deleteAlquiler = function(req, res){ 
  var db=req.db;
  db.query('delete from Alquiler where titulo_pelicula=? and dni_cliente=? and fecha_alquiler like ?"%" and fecha_entrega like ?"%"',[req.params.titulo_pelicula,req.params.dni_cliente,req.params.fecha_alquiler,req.params.fecha_entrega], function(err, datos, fields) {
  if (err) throw err;
     res.status(201).json(datos)
  });
}; 

//Update Alquiler

module.exports.putAlquiler = function(req, res){ 
  var db=req.db;
  db.query('update Alquiler set ? where dni_cliente = ? and titulo_pelicula = ? and fecha_alquiler like ?"%" and fecha_entrega like ?"%"',[req.body,req.params.dni_cliente,req.params.titulo_pelicula,req.params.fecha_alquiler,req.params.fecha_entrega], function(err, datos, fields) {
  if (err) {res.json({"err":"No ha sido posible realizar el alquiler de la pelicula"})
    }else{
     res.status(201).json(datos)
    }
  });
};

//Get Numero de alquileres
module.exports.getNumeroAlquileres = function(req, res){ 
  var db=req.db;
  db.query('SELECT alquiler_pelicula(?)',[req.params.titulo], function(err, datos, fields) {
  if (err) throw err;
  datos= JSON.stringify(datos).replace(/alquiler_pelicula\(\'\w+\'\)/i,'alquiler_pelicula'); //cuando coincida el patron lo cambiamos por la clave alquiler_pelicula
     datos=JSON.parse(datos);
     res.json({"message":"La pelicula se ha alquilado "+datos[0].alquiler_pelicula+" veces"});
  });
};  