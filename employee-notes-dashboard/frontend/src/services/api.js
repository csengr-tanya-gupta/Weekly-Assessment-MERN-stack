import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const noteService = {
  getAllNotes: () => api.get("/notes"),

  createNote: (data) => api.post("/notes", data),

  updateNote: (id, data) => api.put(`/notes/${id}`, data),

  deleteNote: (id) => api.delete(`/notes/${id}`),
};
