import express from "express";
import "dotenv/config.js";
import bookRoutes from "./routers/BookRoutes.js";
import studentRoutes from "./routers/StudentRoutes.js";
import userRoutes from "./routers/UserRoutes.js";
import cors from "cors";

// init app
const app = express();

//enable cors to frontend
let corsOptions = {
  origin: process.env.ORIGIN,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// This is used to log the request on the console
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

try {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`listening  to port ${process.env.PORT || 3000}...`);
  });
} catch (e) {
  console.log(e);
}

app.use("/book", bookRoutes);
app.use("/student", studentRoutes);
app.use("/user", userRoutes);
