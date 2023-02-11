import db from "../firebase.js"
import express from 'express';
const router = express.Router();


router.post("/", (req, res) => {
    const campaignData = {
        campaignTitle: req.body.campaignData,
        tagId: req.body.tagId,
        descript: req.body.description,
        targetAmount: req.body.targetAmount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        country: req.body.country,
        currencyType: req.body.currencyType
    }
    
    const campaignRef = db.collection("campaign").doc()
    campaignRef.set(campaignData)
    res.json({
        message: "Campaign registered successfully!"
    })
})

export default router