const mongoose = require("mongoose");
const moment = require("moment");
moment.locale("es");

const TeatrosShema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  sillas: [
    {
      fila: {
        type: String,
        required: true,
      },
      numSillas: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Teatros = mongoose.model("teatros", TeatrosShema);

module.exports = Teatros;
