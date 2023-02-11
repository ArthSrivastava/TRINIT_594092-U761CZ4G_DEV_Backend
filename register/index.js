import db from "../firebase.js"
import express from 'express';
const router = express.Router();

router.post("/", async (req, res) =>{
    console.log("Inside register")
    
    const docRef = db.collection('users').doc()
    const bodyData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        tagId: req.body.tagId
    }

    await docRef.set(bodyData)

    const doc = await docRef.get()
    // if(!doc.exists()) {
    //     return res.sendStatus(400)
    // }
    console.log(bodyData)

    
    res.json({
        success: "user registered successfully!",
        data: doc.data()
    })
})

export default router