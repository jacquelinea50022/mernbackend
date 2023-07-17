const express = require ("express");
const dbj = require("../db/conn.js");
const {ObjectId} = require ("mongodb");

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let db = dbj.getDB();
  let collection = await db.collection("blogs");
  let list = await collection.find({}).toArray();
  res.send(list).status(200);
 
});

// This section will help you get a single record by id
// router.get("/:id", async (req, res) => {
//   let db = dbj.getDB();
//   let collection = await db.collection("blogs");
//   let query = { _id: new ObjectId(req.params.id) };
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });
router.get("/:id", async (req, res) => {
  let db = dbj.getDB();
  let collection = await db.collection("blogs");
  try {
    let objectId = new ObjectId(req.params.id);
    let query = { _id: ObjectId };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send("Invalid ID");
  }
});

// This section will help you create a new record.
router.post("/add", async (req, res) => {
  let db = dbj.getDB();
  // console.log(db);
  let newDocument = {
    name: req.body.name,
    email: req.body.email,
    entry: req.body.entry,
  };
  let collection = await db.collection("blogs");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  let db = dbj.getDB();
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      email: req.body.email,
      entry: req.body.entry
    }
  };

  let collection = await db.collection("blogs");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section delete a record
router.delete("/:id", async (req, res) => {
  let db = dbj.getDB();
  const query = { _id: new ObjectId(req.params.id) };

  const collection = await db.collection("blogs"); // Fixed: Added "await" keyword
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

module.exports = router;
