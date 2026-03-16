const express = require("express");
const app = express();
const router = require("./routes/router");

app.use(express.static("pulbic"));
app.use(express.urlencoded({extended : true}));
app.use("/",router);

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");

app.listen(3000);
