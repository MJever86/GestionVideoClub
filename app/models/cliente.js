var db=require('./db');

//GET todos los clientes
module.exports.getClientes = function(callback){ 
    db.query('SELECT * from Clientes', function(err, datos, fields) {
        if (err) throw err;
        callback(datos);
    });
};

//GET de un cliente
module.exports.getClientesDni = function(dni,callback){ 
    db.query('SELECT * from Clientes where dni=?',[dni], function(err, datos, fields) {
        if (err) throw err;
        callback(datos);
    });
};

//POST de Clientes
module.exports.postClientes = function(cliente,callback){ 
    db.query('insert into Clientes set ?',[cliente], function(err, datos, fields) {
        if (err) callback({"messagge":"se ha producido un error al insertar el cliente en la base de datos","code":500})
        else
            callback({"messagge":"el cliente se ha insertado correctamente","code":201})
    });
};

//DELETE de Clientes
module.exports.deleteClientes = function(dni, callback){ 
    db.query('delete from Clientes where dni=?',[dni], function(err, datos, fields) {
        if (err) throw err;
        else
            callback(datos);
    });
};

module.exports.putClientes = function(dni,cliente,callback){ 
        db.query('update Clientes set ? where dni = ?',[cliente,dni], function(err, datos, fields) {
            if (err) callback({"messagge":"no ha sido posible actualizar el cliente","code":500})
            else
                callback({"messagge":"el cliente se ha actualizado correctamente","code":200})
        });
};  