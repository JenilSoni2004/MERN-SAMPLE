const express = require("express");
const userrouter = require("./routes/user");
const { connectmongodb } = require('./connection/connection');
const cors=require("cors")

const app = express();
const port = 8000;

connectmongodb('mongodb+srv://Jenilsoni:Jenil%401137@cluster0.mmmptjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log("mongodb connected"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use("/user", userrouter);
app.use(cors());

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
