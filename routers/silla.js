const express = require("express");
const Silla = require("../modelos/SillasModelo");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sillas = await Silla.find()

    res.send(sillas);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontraron sillas");
  }
});
// Funcion get por _id unico
router.get("/:_id", async (req, res) => {
  try {
    const silla = await Silla.findById(req.params._id)

    res.send(silla);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

// Funcion POST
router.post("/", async (req, res) => {
  try {
    const silla = new Silla(req.body);
    const result = await silla.save();

    const sillasave = await Silla.findById(result._id)
    //.populate("sucursales");
    res.status(201).send(sillasave);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se pudo registrar el documento");
  }
});

// Funcion PUT
router.put("/:_id", async (req, res) => {
  try {
    const silla = await Silla.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    })
    //.populate("sucursales");


    res.status(202).send(silla);
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
        .send("El id del silla no contiene el numero correcto de digitos");
    }
    const silla = await Silla.findById(req.params._id);

    if (!silla) {
      return res
        .status(404)
        .send("No se encontro ningun documento para borrar");
    }
    await Silla.findByIdAndDelete(req.params._id);

    res.status(200).send("silla borrado");
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

module.exports = router;
