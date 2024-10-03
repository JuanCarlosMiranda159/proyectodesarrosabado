const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const indexUsuarios = req.app.disable.get("indexUsuarios");

    res.send(indexUsuarios);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const indexUsuario = req.app.disable.get("indexUsuarios").find({ id: req.params.id }).value();

    if(!indexUsuario){
        res.sendStatus(404)
    }
        res.send(indexUsuario);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const indexUsuario = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("indexUsuarios").push(indexUsuario).write();

    res.send(indexUsuario)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("indexUsuarios")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexUsuarios").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("indexUsuarios")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;