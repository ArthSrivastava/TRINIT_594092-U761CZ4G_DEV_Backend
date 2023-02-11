import db from "../firebase.js";
import express from "express";
const router = express.Router();

router.post("/register", async (req, res) => {
  const campaignData = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    targetAmount: req.body.targetAmount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    country: req.body.country,
    currency: req.body.currency,
    creatorId: req.body.creatorId
  };

  const campaignRef = db.collection("NgoCampaigns").doc();
  await campaignRef.set(campaignData);
  res.json({
    message: "Campaign registered successfully!",
  });
});


router.get("/", async (req, res) => {
  const userId = req.query.loggedUserId
  const userRef = db.collection("users").doc(userId)
  const user = await userRef.get()
  const userCategories = user.data().categories
  const sortedCampaigns = []

  const docRef = await db.collection("NgoCampaigns").get()
  const allCampaigns = []
  // console.log(docRef.data)
  docRef.forEach((campaign) => {
    allCampaigns.push({
      id: campaign.id,
      ...campaign.data()
    })
  })

  allCampaigns.forEach((campaign) => {
    if(userCategories.includes(campaign.category)) {
      sortedCampaigns.splice(0, 0, campaign)
    } else {
      sortedCampaigns.push(campaign)
    }
  })
  res.json(sortedCampaigns)
})

router.get("/getCampaignById", async (req, res) => {
  const docRef = db.collection("NgoCampaigns").doc(req.query.campaignId)
  const campaign = await docRef.get()

  res.json(campaign.data())

})

router.get("/search", async (req, res) => {
  let searchQuery = req.query.category
  const docRef = db.collection("NgoCampaigns")
  const queryRef = await docRef.where('category', '==', searchQuery).get()
  
  const allCampaigns = []
  queryRef.forEach((campaign) => {
    allCampaigns.push({
      id: campaign.id,
      ...campaign.data()
    })
  })
  // console.log(queryRef)

  res.json(allCampaigns)
})
export default router;
