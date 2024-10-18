const mongoose = require("mongoose");
const moment = require("moment");
moment.locale("es");

const SillasShema = new mongoose.Schema({
    fila: {
        type: String,
        required: true,
    },
    numSillas: {
        type: Number,
        required: true,
    }
});

const Sillas = mongoose.model("sillas", SillasShema);

module.exports = Sillas;
