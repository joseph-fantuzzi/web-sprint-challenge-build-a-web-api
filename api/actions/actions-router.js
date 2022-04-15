// Write your "actions" router here!

const express = require("express");

const ActionsModel = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {
  ActionsModel.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in retrieving the actions." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  ActionsModel.get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in retrieving the action." });
    });
});

router.post("/", (req, res) => {
  const newAction = req.body;
  ActionsModel.insert(newAction)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in creating the action." });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedAction = req.body;
  ActionsModel.update(id, updatedAction)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in updating the action." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ActionsModel.remove(id)
    .then(() => {
      res.status(200).json({ message: "Action successfully deleted." });
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in deleting the action." });
    });
});

module.exports = router;
