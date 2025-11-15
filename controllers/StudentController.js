import * as StudentModel from "../models/StudentModel.js";

export const fetchStudents = async (req, res) => {
  try {
    const Students = await StudentModel.getStudents();
    res.status(200).json({ success: true, message: Students });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createStudent = async (req, res) => {
  const { name, srCode, course } = req.body;
  try {
    const studentID = await StudentModel.insertStudent(name, srCode, course);
    res.status(201).json({ success: true, message: studentID });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const editStudent = async (req, res) => {
  const { name, srCode, course } = req.body;
  const { studentID } = req.params;

  try {
    const updatedID = await StudentModel.updateStudent(
      name,
      srCode,
      course,
      studentID
    );
    res.status(200).json({ success: true, message: updatedID });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteStudent = async (req, res) => {
  const { studentID } = req.params;

  try {
    const deletedID = await StudentModel.deleteStudent(studentID);
    res.status(200).json({ success: true, message: deletedID });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
