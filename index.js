import app from "./App.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(5000);
