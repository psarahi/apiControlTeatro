const mongoose = require("mongoose");
const moment = require("moment");
moment.locale("es");

const EventoShema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  encargado: { type: String },
  estado: { type: String },
  sillas: [
    {
      silla: { type: String },
      estado: { type: String },
      vendidoA: { type: String }
    },
  ],
});

const Evento = mongoose.model("eventos", EventoShema);

module.exports = Evento;
