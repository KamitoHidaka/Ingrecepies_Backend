import Recepie from "../models/recepie.model.js";

export const createRecepie = async (req, res) => {
  const { name, category, image, description, steps, ingredients } = req.body;

  const newRecepie = new Recepie({
    name,
    category,
    image,
    description,
    steps,
    ingredients,
    user: req.user.id,
  });

  await newRecepie.save();
  res.send("Receta creada");
};

export const getRecepieByName = async (req, res) => {
  const { searchedName } = req.query;

  if (!searchedName || searchedName.length < 3) {
    return res
      .status(400)
      .json({ message: "La busqueda debe contener al menos 3 caracteres" });
  }

  const regex = new RegExp(`\\b${searchedName}`, "i");

  try {
    const recepies = await Recepie.find({ name: { $regex: regex } });

    if (recepies.length === 0) {
      return res
        .status(404)
        .json({
          message: `No hay recetas que coincidan con '${searchedName}'`,
        });
    }

    res.status(200).json(recepies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error", error });
  }
};

export const getMyRecepies = async (req, res) => {
  const recepie = await Recepie.find({
    user: req.user.id,
  });
  res.json(recepie);
};
export const getAllRecepies = async (req, res) => {
  const recepies = await Recepie.find();
  res.status(200).json(recepies);
};

export const deleteRecepie = async (req, res) => {
  const recepie = await Recepie.findByIdAndDelete(req.params.id);
  if (!receíe) return res.status(404).json({ message: "La receta no existe" });
  return res.sendStatus(204);
};

export const updateRecepie = async (req, res) => {
  const recepie = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return res.status(404).json({ message: "La receta no existe" });
  res.json(product);
};
