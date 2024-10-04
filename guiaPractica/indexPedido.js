// importar todas libreberias necesarias.
const   express = require("express");
const   cors = require("cors");
const   morgan = require("morgan");
const   low = require("lowdb");
const indexPedidoRouter = require("../routes/indexPedidos")
//determinamos el puerto Enpoint
const PORT = process.env.PORT ||10801;

//obtenemos la libreria controlador de archivo
const FileSync = require("lowdb/adapters/FileSync");

//creamos el archivo db.json
const adapter = new FileSync("dbindexPedido.json")
const dbindexPedido = low(adapter);

//inicializamos LA DB
dbindexPedido.defaults({indexPedido:[]}).write();
const app =express(); //creamos el aplicativo
app.dbindexPedido = dbindexPedido;
//definimos las variables necesarias.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/indexPedidos",indexPedidoRouter)
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
