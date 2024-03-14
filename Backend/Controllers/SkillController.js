const express = require("express");
const route = express.Router();
const Skill = require("../Models/Skills");
const upload = require("../Utils/StorageFile");
const path = require("path");
const fs = require("fs");

route.get("/skills", async (req, res) => {
    try {
        const getSkills = await Skill.find();
        res.status(200).json(getSkills);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.get("/skill/:id", async (req, res) => {
    try {
        const getSkills = await Skill.findById(req.params.id);
        res.status(200).json(getSkills);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});


route.post("/skill/create", upload.single("image"), async (req, res) => {
    const { name, description } = req.body;
    const createSkill = new Skill({ name, description, image:req.file.filename });
    const saveSkill = await createSkill.save();

    res.status(200).json(saveSkill);
});

route.put("/skill/edit/:id",upload.single("image"), async (req, res) => {
    try {
        const skillId = req.params.id;
        const updateSkillData = req.body;
        const existingSkill = await Skill.findById(skillId);

        if(!existingSkill){
            res.status(404).json({message:"had lprod makaynch"});
        }

        existingSkill.name = updateSkillData.name;
        existingSkill.description = updateSkillData.description;

        if(req.file){
            if(existingSkill.image){
                const imagePath = path.join(__dirname, "..", "uploads", existingSkill.image);
                fs.unlinkSync(imagePath)
            }
            existingSkill.image = req.file.filename;
        }

        const updateData = await existingSkill.save();

        res.json(updateData);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.delete("/skill/delete/:id", async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if(!skill){
            res.json({message: "prod makaynch"})
        }

        await Skill.findByIdAndDelete(req.params.id);

        if(skill.image){
            const imagePath = path.join(__dirname, "..", "uploads", skill.image);
            fs.unlinkSync(imagePath)
        }

        res.json({message:"rah tsuprima m3a limage"})

    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});


module.exports = route;
