// add middlewares here related to projects

const ProjectsModel = require("./projects-model");

function validateProjectId(req, res, next) {
  const { id } = req.params;
  ProjectsModel.get(id)
    .then((project) => {
      if (!project) {
        res.status(404).json({ message: "Project not found." });
      } else {
        req.project = project;
        next();
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error in retrieving the project from the database." });
    });
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (
    !name ||
    !description ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    name.trim() === "" ||
    description.trim() === ""
  ) {
    res.status(400).json({ message: "Missing required name and description fields." });
  } else {
    if (completed) {
      req.newProject = { name: name.trim(), description: description.trim(), completed: completed };
      next();
    } else {
      req.newProject = { name: name.trim(), description: description.trim() };
      next();
    }
  }
}

module.exports = { validateProjectId, validateProject };
