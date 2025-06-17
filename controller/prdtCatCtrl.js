const Category = require("../models/prdtCat");

const createCate = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Please input the category name" });
        }

        const newCategory = new Category({  name, description });
        await newCategory.save();

        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteACat = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCat = await Category.findByIdAndDelete(id);
        if (!deletedCat) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllCat = async (req, res) => {
    try {
        await Category.deleteMany();
        res.status(200).json({ message: "All categories deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCate,
    getAllCategories,
    deleteACat,
    deleteAllCat
};
