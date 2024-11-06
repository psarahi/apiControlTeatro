const express = require("express");
const Evento = require("../modelos/EventosModelo");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.find().sort({ fecha: "desc" })
    .populate('teatros');

    res.send(eventos);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontraron eventos");
  }
});

// Funcion get para eventos programatos
router.get("/teatro/:teatro", async (req, res) => {
  try {
    const evento = await Evento.find({ teatros: req.params.teatro })
    .populate('teatros');

    res.send(evento);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

// Funcion get para eventos programatos
router.get("/programado", async (req, res) => {
  try {
    const evento = await Evento.find({ estado: "Programado" })
    .populate('teatros');

    res.send(evento);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

// Funcion get por _id unico
router.get("/:_id", async (req, res) => {
  try {
    const evento = await Evento.findById(req.params._id)
    .populate('teatros');

    res.send(evento);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

// Funcion POST
router.post("/", async (req, res) => {
  try {
    const evento = new Evento(req.body);
    const result = await evento.save();

    const eventosave = await Evento.findById(result._id)
    .populate('teatros');
    res.status(201).send(eventosave);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se pudo registrar el documento");
  }
});

// Funcion PUT actualizar por nombre
router.put("/nombre", async (req, res) => {
  try {
    const evento = await Evento.findOneAndUpdate(
      { nombre: req.body.nombre },
      req.body,
      { new: true }
    );

    res.status(202).send(evento);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

// Funcion PUT
router.put("/:_id", async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });

    res.status(202).send(evento);
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
        .send("El id del evento no contiene el numero correcto de digitos");
    }
    const evento = await Evento.findById(req.params._id);

    if (!evento) {
      return res
        .status(404)
        .send("No se encontro ningun documento para borrar");
    }
    await Evento.findByIdAndDelete(req.params._id);

    res.status(200).send("evento borrado");
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontro ningun documento");
  }
});

module.exports = router;
