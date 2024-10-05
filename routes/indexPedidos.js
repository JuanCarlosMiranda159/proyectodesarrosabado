const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const indexPedidos = req.app.disable.get("indexPedidos");

    res.send(indexPedidos);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const indexPedido = req.app.disable.get("indexPedidos").find({ id: req.params.id }).value();

    if(!indexPostre){
        res.sendStatus(404)
    }
        res.send(indexPedido);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const indexPostre = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("indexPedidos").push(indexPedido).write();

    res.send(indexPedido)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("indexPedidos")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexPedidos").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("indexPedidos")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;
