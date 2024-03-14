const express = require("express");
const route = express.Router();
const Project = require("../Models/Project");
const upload = require("../Utils/StorageFile");
const path = require("path");
const fs = require("fs");

route.get("/projects", async (req, res) => {
    try {
        const getProjects = await Project.find().populate("category", "name");
        res.status(200).json(getProjects);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.get("/project/:id", async (req, res) => {
    try {
        const getProject = await Project.findById(req.params.id).populate("category", "name");
        res.status(200).json(getProject);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.get("/projects/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId
        const getProject = await Project.find({category: categoryId}).populate("category", "name");
        if(!getProject){
            res.json({message:"ekjfheufef"})
        }
        res.status(200).json(getProject);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.post("/project/create", upload.single("image"), async (req, res) => {
    const { title, link, description, category } = req.body;
    const createProject = new Project({ title, link, description, category, image:req.file.filename });
    const saveProject = await createProject.save();

    res.status(200).json(saveProject);
});

route.put("/project/edit/:id", upload.single("image"), async (req, res) => {
    try {
        const projectId = req.params.id;
        const updateProjectData = req.body;
        const existingProject = await Project.findById(projectId);

        if(!existingProject){
            res.status(404).json({message:"had lprod makaynch"});
        }

        existingProject.title = updateProjectData.title;
        existingProject.description = updateProjectData.description;
        existingProject.link = updateProjectData.link;
        existingProject.category = updateProjectData.category;

        if(req.file){
            if(existingProject.image){
                const imagePath = path.join(__dirname, "..", "uploads", existingProject.image);
                fs.unlinkSync(imagePath)
            }
            existingProject.image = req.file.filename;
        }

        const updateData = await existingProject.save();

        res.json(updateData);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.delete("/project/delete/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project){
            res.json({message: "prod makaynch"})
        }

        await Project.findByIdAndDelete(req.params.id);

        if(project.image){
            const imagePath = path.join(__dirname, "..", "uploads", project.image);
            fs.unlinkSync(imagePath)
        }

        res.json({message:"rah tsuprima m3a limage"})
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});


module.exports = route;
