// add middlewares here related to actions

const ActionsModel = require("./actions-model");

function validateActionId(req, res, next) {
  const { id } = req.params;
  ActionsModel.get(id)
    .then((action) => {
      if (!action) {
        res.status(404).json({ message: "Action not found." });
      } else {
        req.action = action;
        next();
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error in retrieving the action from the database." });
    });
}

function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;
  if (
    !project_id ||
    !description ||
    !notes ||
    typeof project_id !== "number" ||
    typeof description !== "string" ||
    typeof notes !== "string" ||
    description.trim() === "" ||
    notes.trim() === ""
  ) {
    res
      .status(400)
      .json({ message: "Missing required project_id, description, and notes fields." });
  } else {
    req.newAction = {
      project_id: project_id,
      description: description.trim(),
      notes: notes.trim(),
      completed: completed,
    };
    next();
  }
}

module.exports = { validateActionId, validateAction };
