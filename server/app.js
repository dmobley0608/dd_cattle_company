const express = require('express')
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));



app.listen(9000, ()=>{
    console.log("Running on Port 9000")
})