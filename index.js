import express  from "express";
import register from "./register/index.js"
import dotenv from "dotenv"
import tags from "./tags/index.js"
import ngoRegister from "./registerNGO/index.js"
import campaignRegister from "./registerCampaign/index.js"
import getNgoById from "./getNgoById/index.js"
// const login = require("./login")

dotenv.config()
const app = express()
const port = 3000

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/register", register)
app.use("/tags", tags)
app.use("/ngo/register", ngoRegister)
app.use("/campaign/register", campaignRegister)
app.use("/ngo", getNgoById)

app.listen(port, () => {
    console.log("Now listening to " + port)
})

