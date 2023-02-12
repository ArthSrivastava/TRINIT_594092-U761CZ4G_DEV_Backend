import db from "../firebase.js";
import express from "express";
const router = express.Router();

router.post("/register", async (req, res) => {

  console.log(req.body.creatorId);
  const userRef = db.collection("NgoData").doc(req.body.creatorId)
  const user = await userRef.get()

  const campaignData = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    targetAmount: req.body.targetAmount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    country: req.body.country,
    currency: req.body.currency,
    cause: user.data().cause,
    vision: user.data().vision,

  };

  const campaignRef = db.collection("NgoCampaigns").doc();
  await campaignRef.set(campaignData);
  res.json({
    message: "Campaign registered successfully!",
  });
});


router.get("/", async (req, res) => {
  const userId = req.query.loggedUserId
  let userRef = db.collection("users").doc(userId)
  let user = await userRef.get()
  if (user.data() == undefined) {
    userRef = db.collection("NgoData").doc(userId)
    user = await userRef.get()

    if (user.data() != undefined) {
      console.log("NGO");
      const docRef = await db.collection("NgoCampaigns").get()
      let campaigns = []
      docRef.forEach((capmpaign) => {
        campaigns.push({
          id: capmpaign.id,
          ...capmpaign.data()
        })
      })
      console.log(campaigns)
      res.json(campaigns)
      return;
    }
  }
  const sortedCampaigns = []
  if (user.data() != undefined) {
    const userCategories = user.data().categories

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
      if (userCategories.includes(campaign.category)) {
        sortedCampaigns.splice(0, 0, campaign)
      } else {
        sortedCampaigns.push(campaign)
      }
    })
  }
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
