import React, { useState, useEffect } from "react";
import { noteService } from "./services/api";
import Navbar from "./components/Navbar";
import NoteCard from "./components/NoteCard";
import AddNoteForm from "./components/AddNoteForm";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await noteService.getAllNotes();
      setNotes(res.data);
    } catch (err) {
      setError("Unable to connect to the server. Make sure the backend is running on http://localhost:5000 and your MongoDB Atlas URI is set in .env");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await noteService.createNote(data);
    await fetchNotes();
  };

  const handleUpdate = async (id, data) => {
    await noteService.updateNote(id, data);
    setNotes((prev) => prev.map((n) => (n._id === id ? { ...n, ...data } : n)));
  };

  const handleDelete = async (id) => {
    await noteService.deleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayCount = notes.filter((n) => {
    const d = new Date(n.createdAt);
    return d.toDateString() === new Date().toDateString();
  }).length;

  const weekCount = notes.filter((n) => {
    const d = new Date(n.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo;
  }).length;

  return (
    <div className="app">
      <div className="bg-decoration">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-grid" />
      </div>

      <Navbar totalNotes={notes.length} />

      <div className="hero" id="dashboard">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__text">
              <div className="hero__eyebrow">
                <span className="hero__dot" />
                Connected to MongoDB Atlas
              </div>
              <h1 className="hero__title">
                Your Work<br />
                <span className="hero__title-accent">Journal</span>
              </h1>
              <p className="hero__desc">
                Capture daily progress, log achievements, and keep your team in sync -
                all stored securely in the cloud.
              </p>
            </div>
            <div className="hero__stats">
              <div className="stat-card">
                <span className="stat-card__value">{notes.length}</span>
                <span className="stat-card__label">Total Notes</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__value">{todayCount}</span>
                <span className="stat-card__label">Today</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__value">{weekCount}</span>
                <span className="stat-card__label">This Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="main" id="notes">
        <div className="container">
          <div className="search-bar-wrapper">
            <span className="search-icon">S</span>
            <input
              type="text"
              className="search-bar"
              placeholder="Search notes by title or description…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery("")}>x</button>
            )}
          </div>

          <AddNoteForm onAdd={handleAdd} />

          {isLoading && (
            <div className="state-container">
              <div className="loader">
                <div className="loader__ring" />
                <p className="loader__text">Loading your notes from Atlas…</p>
              </div>
            </div>
          )}

          {!isLoading && error && (
            <div className="state-container">
              <div className="error-box">
                <span className="error-box__icon">!</span>
                <h3 className="error-box__title">Connection Error</h3>
                <p className="error-box__message">{error}</p>
                <button className="retry-btn" onClick={fetchNotes}>Retry</button>
              </div>
            </div>
          )}

          {!isLoading && !error && filteredNotes.length === 0 && (
            <div className="state-container">
              <div className="empty-state">
                <div className="empty-state__icon">{searchQuery ? "Search" : "Notes"}</div>
                <h3 className="empty-state__title">
                  {searchQuery ? "No results found" : "No notes yet"}
                </h3>
                <p className="empty-state__message">
                  {searchQuery ? `No notes match "${searchQuery}"` : "Create your first note to get started!"}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !error && filteredNotes.length > 0 && (
            <>
              {searchQuery && (
                <p className="search-results-info">
                  Showing <strong>{filteredNotes.length}</strong> result{filteredNotes.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                </p>
              )}
              <div className="notes-grid">
                {filteredNotes.map((note) => (
                  <NoteCard key={note._id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="footer" id="about">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo">*</span>
            <span className="footer__name">NoteFlow</span>
          </div>
          <p className="footer__copy">
            Employee Notes Dashboard &copy; {new Date().getFullYear()} - Powered by MongoDB Atlas
          </p>
          <div className="footer__stack">
            <span className="footer__tag">React</span>
            <span className="footer__tag">Express</span>
            <span className="footer__tag">MongoDB Atlas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
