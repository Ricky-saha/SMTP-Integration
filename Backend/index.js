const express = require("express");
const mongoose = require("mongoose");
const Mailrouter = require("./Routes/mailroutes");

require("dotenv").config();


const app = express();

const PORT = process.env.PORT;

console.log(process.env.MONGO_URI);
console.log(process.env.PORT);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err));

console.log(process.env.ZOHO_USER);
console.log(process.env.ZOHO_PASS);

app.use(express.json());

app.use((req, res, next)=>{
    console.log("App middleware");
    next();
})
app.use("/api/mail",Mailrouter);

app.get("/", (req, res) => {
    res.send("Hello get route");
});


app.listen(PORT, ()=>{
    console.log(`server is up on ${PORT}`)
})




