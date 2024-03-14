const express = require("express");
const route = express.Router();
const Profile = require("../Models/Profile");
const path = require("path");
const fs = require("fs");
const upload = require("../Utils/StorageFile")

route.get("/profiles", async (req, res) => {
    try {
        const getProfiles = await Profile.find();
        res.status(200).json(getProfiles);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.get("/profile/:id", async (req, res) => {
    try {
        const getProfile = await Profile.findById(req.params.id);
        res.status(200).json(getProfile);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});


route.put("/profile/edit/:id", upload.single("image"), async (req, res) => {
    try {
        const id = req.params.id;
        const updateProfileData = req.body;
        const existingProfile = await Profile.findById(id);

        if(!existingProfile){
            res.status(404).json({message:"profile makaynch"})
        }

        existingProfile.username = updateProfileData.username;
        existingProfile.email = updateProfileData.email;
        existingProfile.firstname = updateProfileData.firstname;
        existingProfile.lastname = updateProfileData.lastname;
        existingProfile.phone = updateProfileData.phone;
        existingProfile.about = updateProfileData.about;
        existingProfile.status = updateProfileData.status;
        existingProfile.linkedin = updateProfileData.linkedin;
        existingProfile.github = updateProfileData.github;
        existingProfile.website = updateProfileData.website;

        if(req.file){
            if (existingProfile.image) {
                const imagePath = path.join(__dirname, "..", "uploads", existingProfile.image);
                fs.unlinkSync(imagePath);
            }
            existingProfile.image = req.file.filename
        }

        const updateProfile = await existingProfile.save();
        res.json(updateProfile);

    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.delete("/profile/delete/:id", async (req, res) => {
    try {
        const deleteProfile = await Profile.findByIdAndDelete(req.params.id);

        if (!deleteProfile) {
            return res.status(404).json({ message: "had profile rah makaynch" });
        }

        res.json({ message: "profile rah tsuprima" });
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});


module.exports = route;
