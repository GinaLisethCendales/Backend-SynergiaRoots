const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 8090;
const URL = process.env.MONGO_CONN;


async function dbConnect() {
    // Conectarnos a la Base de datos la palabra reservada await cuando la función es ASYNC me permite pausar la ejecución de la siguiente línea hasta que se haya resuelto la petición asincrona
    mongoose.set('strictQuery', false);

    await mongoose.connect(URL)
    
    console.log(`\x1b[0m \x1b[42m Conexión a la DB correcta!!! \x1b[0m`);
    app.listen(port, ()=> {
        console.log(`\x1b[32m Servidor express escuchando en el puerto \x1b[37m ${port}`)
    })
}


dbConnect().catch(error => console.error(`Error al conectar con la DB`, error));