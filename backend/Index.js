const express = require("express");
const userrouter = require("./routes/user");
const { connectmongodb } = require('./connection/connection');
const cors=require("cors")

const app = express();
const port = 8000;

connectmongodb('mongodb://localhost:27017/test')
.then(()=>console.log("mongodb connected"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use("/user", userrouter);
app.use(cors());

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
