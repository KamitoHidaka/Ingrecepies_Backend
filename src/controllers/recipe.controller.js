import Recipe from "../models/recipe.model.js";

export const createRecipe = async (req, res) => {
  const { name, category, description, image, steps, ingredients } = req.body;

  try {
    const newRecipe = new Recipe({
      name,
      category,
      description,
      steps,
      ingredients,
      user: req.user.id,
      image,
    });

    await newRecipe.save();
    res.send("Receta creada");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecipeByName = async (req, res) => {
  const { searchedName } = req.query;

  if (!searchedName || searchedName.length < 3) {
    return res
      .status(400)
      .json({ message: "La busqueda debe contener al menos 3 caracteres" });
  }

  const regex = new RegExp(`\\b${searchedName}`, "i");

  try {
    const recipes = await Recipe.find({ name: { $regex: regex } });

    if (recipes.length === 0) {
      return res.status(404).json({
        message: `No hay recetas que coincidan con '${searchedName}'`,
      });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error", error });
  }
};

export const getMyRecipes = async (req, res) => {
  const recipe = await Recipe.find({
    user: req.user.id,
  });
  res.json(recipe);
};

export const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: "La receta no existe" });
  res.json(recipe);
};

export const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
};

export const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) return res.status(404).json({ message: "La receta no existe" });
  return res.sendStatus(204);
};

export const updateRecipe = async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!recipe) return res.status(404).json({ message: "La receta no existe" });
  res.json(recipe);
};
