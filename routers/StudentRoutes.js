import * as StudentController from "../controllers/StudentController.js";
import express from "express";

const studentRoutes = express.Router();

studentRoutes.get("/all", StudentController.fetchStudents);
studentRoutes.post("/new", StudentController.createStudent);
studentRoutes.put("/edit/:studentID", StudentController.editStudent);
studentRoutes.delete("/delete/:studentID", StudentController.deleteStudent);

export default studentRoutes;
