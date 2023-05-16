import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("fighters");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("fighters");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newFighter = {
    age: req.body.age,
    country: req.body.country,
    fullName: req.body.fullName,
    picture: req.body.picture,
    record: req.body.record,
    weightclass: req.body.weightclass,
  };
  let collection = await db.collection("fighters");
  let result = await collection.insertOne(newFighter);
  res.send(result).status(204);
});

// This section will help you update a record by id.
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

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("fighters");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
