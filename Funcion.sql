/**primero para crear una funcionar hay que borrarla si ya existe*/

DROP FUNCTION IF EXISTS alquiler_pelicula;

DELIMITER $$ 

CREATE FUNCTION alquiler_pelicula(pelicula TEXT) /**le pasamos la variable pelicula de tipo texto*/


RETURNS INT
BEGIN  
DECLARE numero_alquileres INT default 0;


/**hacemos select contando todas las filas cuando el nombre de la pelicula coincida con el que le hemos pasado a la funcion
e introducimos el numero de la variable*/

SELECT count(*) into numero_alquileres from Alquiler where titulo_pelicula=pelicula;

RETURN numero_alquileres;

END;

$$

DELIMITER ; 

