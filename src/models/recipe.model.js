import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  ingredientName: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  unit: {
    type: String,
    require: true,
  },
});

const stepsSchema = new mongoose.Schema({
  step: {
    type: String,
    require: true,
  },
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  description: {
    type: String
  },
  ingredients: {
    type: [ingredientSchema],
    require: true,
  },
  steps: {
    type: [stepsSchema],
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  }, 
  image: {
    type: String,
    require: true,
  },
},{
  timestamps: true
});

export default mongoose.model("Recipe", recipeSchema);
