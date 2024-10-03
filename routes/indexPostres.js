const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const indexPostres = req.app.disable.get("indexPostres");

    res.send(indexPostres);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const indexPostre = req.app.disable.get("indexPostres").find({ id: req.params.id }).value();

    if(!indexPostre){
        res.sendStatus(404)
    }
        res.send(indexPostre);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const indexPostre = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("indexPostres").push(indexPostre).write();

    res.send(indexPostre)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("indexPostres")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexPostres").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("indexPostres")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;
