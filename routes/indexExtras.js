const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const indexExtras = req.app.disable.get("indexExtras");

    res.send(indexExtras);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const indexExtra = req.app.disable.get("indexExtras").find({ id: req.params.id }).value();

    if(!indexPostre){
        res.sendStatus(404)
    }
        res.send(indexExtra);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const indexExtra = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("indexExtras").push(indexExtra).write();

    res.send(indexExtra)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("indexExtras")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexExtras").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("indexExtras")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;
