/** creamos un usuario para darle permisos para las tablas*/

drop user jefe@localhost;
create user jefe@localhost identified by 'videoclub';
grant select, insert, update, delete on proyecto.Clientes to jefe@localhost;
grant select, insert, update, delete on proyecto.Peliculas to jefe@localhost;
grant select, insert, update, delete on proyecto.Alquiler to jefe@localhost;
grant execute on function proyecto.alquiler_pelicula to jefe@localhost;
flush privileges;