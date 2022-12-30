const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path=require("path");
const usersRoute=require("./routes/users");
const notesRoute=require("./routes/notes")
const checkAuth=require("./middleware/checkauth");
require('dotenv').config()
const app = express();


//*Database Connection
app.listen(8080)
mongoose.set('strictQuery', true);
mongoose.connect(process.env.connection).then(_ => console.log("Connected !")).catch(err => console.log("Error" + err.toString()))

//! MiddleWares
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
})/
app.use("/images",express.static(path.join(__dirname,"images")))
app.use(express.static('images'));
app.use(bodyParser.json());
app.use(morgan('dev'));

//?Routes
app.use("/users",usersRoute);
app.use("/notes",notesRoute);

