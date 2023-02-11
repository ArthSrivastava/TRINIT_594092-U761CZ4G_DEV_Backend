import db from "../firebase.js";
import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  const campaignData = {
    campaignTitle: req.body.campaignData,
    tagId: req.body.tagId,
    descript: req.body.description,
    targetAmount: req.body.targetAmount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    country: req.body.country,
    currencyType: req.body.currencyType,
  };

  const campaignRef = db.collection("NgoCampaigns").doc();
  campaignRef.set(campaignData);
  res.json({
    message: "Campaign registered successfully!",
  });
});


router.get("/", async (req, res) => {
  const docRef = await db.collection("NgoCampaigns").get()
  const allCampaigns = []
  // console.log(docRef.data)
  docRef.forEach((campaign) => {
    allCampaigns.push({
      id: campaign.id,
      data: campaign.data()
    })
  })
})
export default router;
