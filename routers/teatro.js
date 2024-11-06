const express = require("express");
const Teatros = require("../modelos/TeatrosModelo");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teatro = await Teatros.find()

    res.send(teatro);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontraron teatro");
  }
});
// Funcion get por _id unico
router.get("/:_id", async (req, res) => {
  try {
    const teatro = await Teatros.findById(req.params._id)

    res.send(teatro);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

// Funcion POST
router.post("/", async (req, res) => {
  try {
    const teatro = new Teatros(req.body);
    const result = await teatro.save();

    const teatroSave = await Teatros.findById(result._id)
    res.status(201).send(teatroSave);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se pudo registrar el documento");
  }
});

// Funcion PUT
router.put("/:_id", async (req, res) => {
  try {
    const teatro = await Teatros.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    })

    res.status(202).send(teatro);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

// Funcion DELETE
router.delete("/:_id", async (req, res) => {
  try {
    if (req.params._id.length != 24) {
      return res
        .status(404)
        .send("El id del teatro no contiene el numero correcto de digitos");
    }
    const teatro = await Teatros.findById(req.params._id);

    if (!teatro) {
      return res
        .status(404)
        .send("No se encontro ningun documento para borrar");
    }
    await Teatros.findByIdAndDelete(req.params._id);

    res.status(200).send("Teatro borrado");
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

module.exports = router;
