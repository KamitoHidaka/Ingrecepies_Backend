import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
    const { 
     name
     } = req.body;
    const newCategory = new Category({name });

    const categorySaved = await newCategory.save();

    res.json({
        id: categorySaved._id,
        name: categorySaved.name
    });
}

export const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
}

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.json(category);
}

export const updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "La categoria no existe" });
    res.json(category);
}

export const deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "La categoria no existe" });
    return res.sendStatus(204);
}