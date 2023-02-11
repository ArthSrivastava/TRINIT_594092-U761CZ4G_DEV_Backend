//get requests for ngos
import db from "../firebase.js";
import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  console.log("Inside register");
  const ngoData = {
    cause: req.body.cause,
    vision: req.body.vision,
    impact: req.body.impact,
    ownerUserId: req.body.ownerUserId,
  };
  const ngoRef = db.collection("NgoData").doc();
  ngoRef.set(ngoData);
  res.json({
    message: "Ngo registered successfully",
  });
});

//get ngo data by id
router.get(`/getNgoById`, async (req, res) => {
  console.log(req.query.ngoId);
  const ngoDoc = db.collection("NgoData").doc(req.query.ngoId);
  const ngo = await ngoDoc.get();
  res.json(ngo.data());
});
export default router;
