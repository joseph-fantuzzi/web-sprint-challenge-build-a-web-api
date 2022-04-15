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

module.exports = { validateProjectId };
