import * as BookModel from "../models/BookModel.js";

export const fetchBooks = async (req, res) => {
  try {
    const books = await BookModel.getBooks();
    res.status(200).json({ success: true, message: books });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createBook = async (req, res) => {
  const { title, genre, status } = req.body;
  try {
    const bookID = await BookModel.insertBook(title, genre, status);
    res.status(201).json({ success: true, message: bookID });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const editBook = async (req, res) => {
  const { title, genre, status } = req.body;
  const { bookId } = req.params;

  try {
    const updatedID = await BookModel.updateBook(title, genre, status, bookId);
    res.status(200).json({ success: true, message: updatedID });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const deletedID = await BookModel.deleteBook(bookId);
    res.status(200).json({ success: true, message: deletedID });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
