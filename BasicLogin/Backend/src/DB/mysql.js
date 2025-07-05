import mysql from 'mysql';
import config from '../config.js';

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function connectMysql() {
    // 1. Crea conexión
    connection = mysql.createConnection(dbconfig);

    // 2. Intenta conectar
    connection.connect((err) => {
        if (err) {
            console.log("db error", err);
            setTimeout(connectMysql, 200); // Reintenta en 200ms
        } else {
            console.log("db connection connected");
        }
    });

    // 3. Si la conexión ya activa falla en el futuro
    connection.on("error", (err) => {
        console.log("db error", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            connectMysql(); // Reintenta
        } else {
            throw err; // Otro error: detiene todo
        }
    });
}

connectMysql();

function getById(tabla,id){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (err, result) => {
            return err ?
                reject(err):
                resolve(result)//funciona como un return que mira que all este bien
        })
    })
}

//funcion para login
function getByEmail(tabla,email){
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE email = ?`, [email],
            (err,result) => {
            return err ?
                reject(err):
                resolve(result)
        })
    })
}

// Esta función agrega un registro en la tabla indicada
function addOnTable(tabla, data) {
    // Retorna una promesa para poder usar async/await o .then()
    return new Promise((resolve, reject) => {
        // Ejecutamos una consulta SQL con placeholders
        connection.query(
            // Consulta que inserta
            `INSERT INTO ${tabla} SET ? `, [data],
            // Callback que se ejecuta al terminar la consulta
            (err, result) => {
                // Si hubo error, rechazamos la promesa
                if (err) {
                    return reject(err);
                }
                // Si all salió bien, resolvemos con el resultado
                return resolve(result);
            }
        );
    });
}


export default {
    getById,addOnTable,getByEmail
}