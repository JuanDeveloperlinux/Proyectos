import bcrypt from "bcrypt";
import asignarToken from "../../Utils/generateToken.js";

const TABLA = "users"

export  function userController(injectedDb){

    let db = injectedDb;

    if (!db){
        db = import('../../DB/mysql.js');
    }

    function getUserById(id) {
        return db.getById(TABLA, id)
    }

    async function userLogin(email,password){
        try{
            //obtiene los datos de la consulta sql
            const datafromDB = await db.getByEmail(TABLA,email);
            console.log(datafromDB)

            //si no hay datos significa que no hay usuario
            if (datafromDB.length === 0){
                return {success:false,message:"Usuario no encontrado"}
            }else{

                //si hay datos saco los datos del usuario
                const user = datafromDB[0];

                //comparo las contraseñas
                const passwordMatch = await bcrypt.compare(password, user.password);

                //si son iguales creo el token y lo devuelvo y si no les digo que datos incorrectos
                if (passwordMatch){
                    const token = asignarToken({
                        id: user.id,
                        name:user.name,
                    })
                    return {success:true,message:"Login exitoso",token}
                }else{
                    return {success:false,message:"Datos incorrectos"}
                }
            }
            //si hay un error en la consulta de la base de datos o algo asi devuelvo el mensaje de error
        }catch(err){
            return {success:false,message:err.message};
        }
    }

    async function addUser(data) {
        const authData = {
            id:data.id
        }
        data.name? authData.name = data.name: null
        data.email? authData.email = data.email: null
        data.password? authData.password = await bcrypt.hash(data.password.toString(),5) : null

        return db.addOnTable(TABLA, authData)
    }

    return {getUserById,addUser,userLogin}
}

//el controlador se encarga de toda la logica de negocio, verificar que los datos esten bien y que se va a ahcer con ellos, se lo manda a las funciones de la base de datos para que ella haga lo que tiene que hacer
