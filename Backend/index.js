const express = require("express");
const mongoose = require("mongoose");
const Mailrouter = require("./Routes/mailroutes");
const smtpRouter = require("./Routes/smtproutes");

require("dotenv").config();


const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// console.log(process.env.MONGO_URI);
// console.log(process.env.PORT);


// db connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err));


app.use((req, res, next)=>{
    console.log("App middleware");
    next();
})

//Routes
app.use("/api/mail",Mailrouter);
app.use("/api/smtp",smtpRouter);


// home route
app.get("/", (req, res) => {
    res.send("Hello get route");
});

// Server check
app.listen(PORT, ()=>{
    console.log(`server is up on ${PORT}`)
})




