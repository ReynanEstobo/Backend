import express from "express";
import "dotenv/config.js";
import bookRoutes from "./routers/BookRoutes.js";
import studentRoutes from "./routers/StudentRoutes.js";

// Create an Express app
const app = express();

// Middleware
app.use(express.json());

try {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`listening  to port ${process.env.PORT || 3000}...`);
  });
} catch (e) {
  console.log(e);
}

app.use("/book", bookRoutes);
app.use("/student", studentRoutes);
