// Write your "actions" router here!

const express = require("express");

const ActionsModel = require("./actions-model");

const { validateActionId, validateAction } = require("./actions-middleware");

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

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction, (req, res) => {
  ActionsModel.insert(req.newAction)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in creating the action." });
    });
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  ActionsModel.update(req.action.id, req.newAction)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in updating the action." });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  ActionsModel.remove(req.action.id)
    .then(() => {
      res.status(200).json({ message: "Action successfully deleted." });
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in deleting the action." });
    });
});

module.exports = router;
