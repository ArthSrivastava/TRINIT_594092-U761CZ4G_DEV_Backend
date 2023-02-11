//get requests for ngos
import db from "../firebase.js"
import express from 'express';
const router = express.Router();

let ngoId = ''
router.get(`/${ngoId}`, (req, res) => {
    const ngoDoc = db.collection.get(ngoId)
    res.json({
        ngo: ngoDoc.data()
    })
})
export default router