import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
//configure env
dotenv.config();

//database config
connectDB();
//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan(`dev`));
app.get(`/`, (req, res) => {
  res.send(`<h1>Welcome to E commerce app</h1>`);
});

//routes
app.use(`/api/v1/auth`, authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgCyan.white);
});
