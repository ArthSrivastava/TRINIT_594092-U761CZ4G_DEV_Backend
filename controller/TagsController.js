import db from "../firebase.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const tagsRef = await db.collection("tags").get();
  const tagObj = [];
  tagsRef.forEach((doc) => {
    tagObj.push({
      tagId: doc.id,
      tagName: doc.data().tagName,
    });
  });

  res.json({
    tags: tagObj,
  });
});

export default router;
