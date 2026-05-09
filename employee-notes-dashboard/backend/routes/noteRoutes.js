const express = require("express");
const router = express.Router();
const Note = require("../models/Note");


router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const note = new Note({ title, description });
    await note.save();

    res.status(201).json({ message: "Note created successfully" });
  } catch (err) {
    console.error("Error creating note:", err.message);
    res.status(500).json({ message: "Failed to create note", error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err.message);
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (err) {
    console.error("Error fetching note:", err.message);
    res.status(500).json({ message: "Failed to fetch note", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully", note });
  } catch (err) {
    console.error("Error updating note:", err.message);
    res.status(500).json({ message: "Failed to update note", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err.message);
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
});

module.exports = router;
