
//GET todos los clientes
module.exports.getClientes = function(req, res){ 
  var db=req.db;
  db.query('SELECT * from Clientes', function(err, datos, fields) {
  if (err) throw err;
     res.json(datos)
  });
};  

//GET de un cliente
module.exports.getClientesDni = function(req, res){ 
  var db=req.db;
  db.query('SELECT * from Clientes where dni=?',[req.params.dni], function(err, datos, fields) {
  if (err) throw err;
     res.json(datos)
  });
};  

//POST de Clientes
module.exports.postClientes = function(req, res){ 
  var db=req.db;
  if(req.body.dni && req.body.nombre && req.body.apellidos){
    db.query('insert into Clientes set ?',[req.body], function(err, datos, fields) {
  if (err) throw err;
    res.status(201).json(datos)
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

//DELETE de Clientes
module.exports.deleteClientes = function(req, res){ 
  var db=req.db;
  db.query('delete from Clientes where dni=?',[req.params.dni], function(err, datos, fields) {
  if (err) throw err;
     res.status(201).json(datos)
  });
};  

//UPDATE de Clientes

module.exports.putClientes = function(req, res){ 
  var db=req.db;
  if(req.body.dni && req.body.nombre && req.body.apellidos){
      db.query('update Clientes set ? where dni = ?',[req.body,req.params.dni], function(err, datos, fields) {
  if (err) throw err;
    res.status(201).json(datos)
  });
  }else{
      res.status(409).json({"messagge":"Los datos introducidos no son correctos"})
  }
};  
  





