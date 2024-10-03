const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const indexComidas = req.app.disable.get("indexComidas");

    res.send(indexComidas);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const indexComida = req.app.disable.get("indexComidas").find({ id: req.params.id }).value();

    if(!indexComida){
        res.sendStatus(404)
    }
        res.send(indexComida);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const indexComida = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("indexComidas").push(indexComida).write();

    res.send(indexProducto)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("indexComidas")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexComidas").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("indexComidas")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;