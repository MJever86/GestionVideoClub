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
  db.query('insert into Peliculas set ?',[req.body], function(err, datos, fields) {
  if (err) throw err; //poner en todos
     res.status(201).json(datos)
  });
};  

//Delete peliculas

module.exports.deletePeliculas = function(req, res){ 
  var db=req.db;
  db.query('delete from Peliculas where titulo=?',[req.params.titulo], function(err, datos, fields) {
  if (err) throw err;
     res.status(201).json(datos)
  });
};  

//Update pelicula

module.exports.putPeliculas = function(req, res){ 
  var db=req.db;
  db.query('update Peliculas set ? where titulo = ?',[req.body,req.params.titulo], function(err, datos, fields) {
  if (err) throw err;
     res.status(201).json(datos)
  });
}; 