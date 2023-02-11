import db from "../firebase.js"
import express from 'express';
const router = express.Router();

router.post("/", (req, res) => {
    const ngoData = {
        cause: req.body.cause,
        vision: req.body.vision,
        impact: req.body.impact,
        ownerUserId: req.body.ownerUserId
    }
    const ngoRef = db.collection("NgoData").doc()
    ngoRef.set(ngoData)
    res.json({
        "message": "Ngo registered successfully"
    })
})

export default router