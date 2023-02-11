import db from "../firebase.js";
import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  const campaignData = {
    campaignTitle: req.body.title,
    tagId: req.body.category,
    description: req.body.description,
    targetAmount: req.body.targetAmount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    country: req.body.country,
    currency: req.body.currency,
    creatorId: req.body.creatorId
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

router.get("/search", async (req, res) => {
  let searchQuery = req.query.tagName
  const docRef = db.collection("NgoCampaigns")
  const queryRef = await docRef.where('tagId', '==', searchQuery).get()
  
  const allCampaigns = []
  queryRef.forEach((campaign) => {
    allCampaigns.push(campaign.data())
  })
  // console.log(queryRef)

  res.json({
    data: allCampaigns
  })
})
export default router;
