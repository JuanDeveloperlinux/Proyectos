import app from './app.js'
import connection from "./DB/mysql.js";

app.listen(app.get("port"), () => {
    console.log(`servidor escuchando en el puerto` ,app.get("port"));
})
