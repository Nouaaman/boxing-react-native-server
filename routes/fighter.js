import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//get all
router.get("/", async (req, res) => {
  let collection = await db.collection("fighters");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//get one by id
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("fighters");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    console.log("Error : ", error);
    return res.send("Not found").status(404);
  }
});

//add
router.post("/", async (req, res) => {
  let newFighter = {
    age: req.body.age,
    country: req.body.country,
    fullName: req.body.fullName,
    picture: req.body.picture,
    record: req.body.record,
    weightclass: req.body.weightclass,
    description:req.body.description
  };
  let collection = await db.collection("fighters");
  let result = await collection.insertOne(newFighter);
  res.send(result).status(204);
});

//edit
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      age: req.body.age,
      country: req.body.country,
      fullName: req.body.fullName,
      picture: req.body.picture,
      record: req.body.record,
      weightclass: req.body.weightclass,
    },
  };

  let collection = await db.collection("fighters");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

//delete by id
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("fighters");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

//search fighters by name
router.get("/search/:name", async (req, res) => {
  const name = req.params.name;

  const fighters = db.collection("fighters");

  try {
    const searchQuery = { fullName: { $regex: name, $options: "i" } };
    const searchResults = await fighters.find(searchQuery).toArray();

    res.json(searchResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
