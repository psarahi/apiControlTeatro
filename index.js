const mongoose = require("mongoose");

const express = require("express");
const http = require("http");
const app = express();

let server = http.createServer(app);

app.use(express.json());

const evento = require("./routers/evento");
const silla = require("./routers/silla");
const teatro = require("./routers/teatro");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/evento", evento);
app.use("/api/silla", silla);
app.use("/api/teatro", teatro);

const port = process.env.API_PORT || 3003;
server.listen(port, () => console.log("Escuchando Puerto: " + port));

mongoose
  .connect(
    // `mongodb+srv://lesly:${process.env.MONGOPASS}@cluster0.g3yej.mongodb.net/controlTeatro?retryWrites=true&w=majority&appName=Cluster0`
    // `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_NAME}:27017/${process.env.MONGO_DB_NAME}?authSource=admin`
    `${process.env.STRING_CONNECT}://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_NAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`
  )
  .then(() => console.log("Conectado a MongoDb"))
  .catch((error) => console.log(error));
