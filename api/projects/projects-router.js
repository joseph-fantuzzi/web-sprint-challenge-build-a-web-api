// Write your "projects" router here!

const express = require("express");

const ProjectsModel = require("./projects-model");

const { validateProjectId } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res) => {
  ProjectsModel.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "There was an error in retrieving the projects." });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", (req, res) => {
  const newProject = req.body;
  ProjectsModel.insert(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in creating the project." });
    });
});

router.put("/:id", validateProjectId, (req, res) => {
  const updateProject = req.body;
  ProjectsModel.update(req.project.id, updateProject)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in updating the project." });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  ProjectsModel.remove(req.project.id)
    .then(() => {
      res.status(200).json({ message: "Project successfully deleted." });
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error in deleting the project." });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  ProjectsModel.getProjectActions(req.project.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "There was an error in retrieving the actions for this project." });
    });
});

module.exports = router;
