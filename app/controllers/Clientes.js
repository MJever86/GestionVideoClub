
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
  db.query('insert into Clientes set ?',[req.body], function(err, datos, fields) {
  if (err) throw err;
     res.status(201).json(datos)
  });
};  

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
  db.query('update Clientes set ? where dni = ?',[req.body,req.params.dni], function(err, datos, fields) {
  if (err) throw err;
     res.status(201).json(datos)
  });
};  
  





