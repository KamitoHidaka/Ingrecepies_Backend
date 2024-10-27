import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryId:{
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    }
});

export default mongoose.model("Category", categorySchema);