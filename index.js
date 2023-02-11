import express from "express";
import UserController from "./controller/UserController.js";
import dotenv from "dotenv";
import TagsController from "./controller/TagsController.js";
import CampaignController from "./controller/CampaignController.js";
import NgoController from "./controller/NgoController.js";
// const login = require("./login")

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", UserController);
app.use("/tags", TagsController);
app.use("/ngos", NgoController);
app.use("/campaigns", CampaignController);

app.listen(port, () => {
  console.log("Now listening to " + port);
});
