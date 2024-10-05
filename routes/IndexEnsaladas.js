const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const indexEnsaladas = req.app.disable.get("indexEnsaladas");

    res.send(indexEnsaladas);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const indexEnsala = req.app.disable.get("indexEnsaladas").find({ id: req.params.id }).value();

    if(!indexEnsalada){
        res.sendStatus(404)
    }
        res.send(indexEnsala);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const indexEnsala = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("indexEnsalas").push(indexEnsala).write();

    res.send(indexEnsalada)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("indexEnsaladas")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexEnsaladas").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("indexEnsaladas")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;
