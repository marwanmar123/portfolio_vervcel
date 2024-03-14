const express = require("express");
const route = express.Router();
const Category = require("../Models/Category");

route.get("/categories", async (req, res) => {

    try {
        const getCategories = await Category.find();
        res.status(200).json(getCategories);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.post("/category/create", async (req, res) => {
    const { name } = req.body;
    const createCategory = new Category({ name });
    const saveCategory = await createCategory.save();

    res.status(200).json(saveCategory);
});

route.put("/category/edit/:id", async (req, res) => {
    try {
        const updatCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!updatCategory) {
            return res.status(404).json({ message: "had lcategory rah makaynch" });
        }
        res.json(updatCategory);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.delete("/category/delete/:id", async (req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deleteCategory) {
            return res.status(404).json({ message: "had lcategory rah makaynch" });
        }

        res.json({ message: "category rah tsuprima" });
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});


module.exports = route;
