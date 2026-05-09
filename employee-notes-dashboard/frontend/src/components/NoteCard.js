import React, { useState } from "react";
import "./NoteCard.css";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const NoteCard = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;
    setIsDeleting(true);
    try {
      await onDelete(note._id);
    } catch {
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Both fields are required.");
      return;
    }
    setIsSaving(true);
    setError("");
    try {
      await onUpdate(note._id, { title: editTitle, description: editDescription });
      setIsEditing(false);
    } catch {
      setError("Failed to update. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditDescription(note.description);
    setIsEditing(false);
    setError("");
  };

  if (isEditing) {
    return (
      <div className={`note-card editing ${isDeleting ? "deleting" : ""}`}>
        <div className="note-card__edit-form">
          <input
            className="note-card__edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Note title"
            maxLength={200}
          />
          <textarea
            className="note-card__edit-textarea"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Note description"
            rows={4}
            maxLength={2000}
          />
          {error && <p className="note-card__edit-error">{error}</p>}
          <div className="note-card__edit-actions">
            <button className="btn btn--save" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button className="btn btn--cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`note-card ${isDeleting ? "deleting" : ""}`}>
      <div className="note-card__accent-bar" />
      <div className="note-card__body">
        <h3 className="note-card__title">{note.title}</h3>
        <p className="note-card__description">{note.description}</p>
      </div>
      <div className="note-card__footer">
        <span className="note-card__date">
          <span className="note-card__date-label">Created At: </span>
          {formatDate(note.createdAt)}
        </span>
        <div className="note-card__actions">
          <button
            className="icon-btn icon-btn--edit"
            onClick={() => setIsEditing(true)}
            title="Edit note"
          >
            Edit
          </button>
          <button
            className="icon-btn icon-btn--delete"
            onClick={handleDelete}
            title="Delete note"
            disabled={isDeleting}
          >
            {isDeleting ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
