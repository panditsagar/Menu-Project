import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import categoriesRoutes from "./routes/categories.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import adminRoutes from "./routes/admin.routes.js";
dotenv.config();

connectDB();
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Change this to your deployed frontend URL when deploying frontend
    credentials: true, // IMPORTANT for cookies
  })
);


//Api's
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/items", itemsRoutes);
app.use("/api/v1/admin", adminRoutes);

// Check localhost:5000
app.get("/", (req, res) => res.send("Server is running on localhost:5000"));
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
