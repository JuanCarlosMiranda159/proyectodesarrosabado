// importar todas libreberias necesarias.
const   express = require("express");
const   cors = require("cors");
const   morgan = require("morgan");
const   low = require("lowdb");
const indexExtraRouter = require("../routes/indexExtras")
//determinamos el puerto Enpoint
const PORT = process.env.PORT ||10801;

//obtenemos la libreria controlador de archivo
const FileSync = require("lowdb/adapters/FileSync");

//creamos el archivo db.json
const adapter = new FileSync("dbindexExtra.json")
const dbindexExtra = low(adapter);

//inicializamos LA DB
dbindexExtra.defaults({indexExtra:[]}).write();
const app =express(); //creamos el aplicativo
app.dbindexExtra = dbindexExtra;
//definimos las variables necesarias.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/indexExtras",indexExtraRouter)
//mostramos el log de ejecucion
app.listen(PORT, () => console.log(`el servidor esta corriendo el puerto ${PORT}`));

//servicio REST
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Libreria APIs - CERTUS",
            version: "1.0.0",
            descripcion: "Demo de Librerias de Ventas API",
        },
        servers: [
            {
                url: "http://localhost:" + PORT,
            },
        ],
    },
    apis: ["./routes/*.js"],
};
