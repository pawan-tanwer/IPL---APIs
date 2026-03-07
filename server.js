require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDb = require("./src/config/db");
connectDb();

const iplRoutes = require("./src/routes/ipl.routes");
app.use("/api/ipl", iplRoutes);

app.get("/", (req,res)=>{
    res.send("Hello World");
})


app.listen(process.env.PORT || 5000, ()=>console.log("Server is running on port 5000"));