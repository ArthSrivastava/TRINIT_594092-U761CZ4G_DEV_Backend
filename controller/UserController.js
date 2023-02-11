import db from "../firebase.js";
import express from "express";
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("Inside register");

  const docRef = db.collection("users").doc();
  const bodyData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    tagId: req.body.tagId,
  };

  await docRef.set(bodyData);

  const doc = await docRef.get();
  // if(!doc.exists()) {
  //     return res.sendStatus(400)
  // }
  console.log(bodyData);

  res.json({
    success: "user registered successfully!",
    data: doc.data(),
  });
});


//get all users
router.get("/", async (req, res) => {
  const docRef = await db.collection("users").get()

  const allUsers = []
  docRef.forEach((user) => {
    allUsers.push({
      userId: user.id,
      email: user.data().email,
      name: user.data().name
    })
  })

  res.json({
    Users: allUsers
  })
})


//get user by id
router.get("/getUserById", async (req, res) => {
  const docRef = db.collection("users").doc(req.query.userId)
  const user = await docRef.get()

  res.json(user.data())

})
export default router;
