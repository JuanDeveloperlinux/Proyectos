const TABLA = "users"

export  function userController(injectedDb){

    let db = injectedDb;

    if (!db){
        db = import('../../DB/mysql.js');
    }

    function getUserById(id) {
        return db.getById(TABLA, id)
    }

    return {getUserById}
}

//el controlador se encarga de toda la logica de negocio, verificar que los datos esten bien y que se va a ahcer con ellos, se lo manda a las funciones de la base de datos para que ella haga lo que tiene que hacer
