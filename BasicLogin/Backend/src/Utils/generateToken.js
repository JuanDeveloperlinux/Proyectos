import jwt from 'jsonwebtoken'
import config  from '../config.js'

const secret = config.jwt.secret

function asignarToken(data){
    return jwt.sign(data, secret)
}

export default asignarToken

//funcion para crear el token con jwt



