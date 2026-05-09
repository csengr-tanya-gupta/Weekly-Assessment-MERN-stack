import React, { useState } from "react";
import "./AddNoteForm.css";

const AddNoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onAdd({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      setIsOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setError("");
    setIsOpen(false);
  };

  return (
    <div className="add-note-wrapper">
      {!isOpen ? (
        <button className="add-note-trigger" onClick={() => setIsOpen(true)}>
          <span className="add-note-trigger__icon">+</span>
          <span>Add New Note</span>
        </button>
      ) : (
        <div className="add-note-form">
          <div className="add-note-form__header">
            <h3 className="add-note-form__title">New Note</h3>
            <div className="add-note-form__dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>
          </div>

          <div className="add-note-form__fields">
            <div className="field-group">
              <label className="field-label">Title</label>
              <input
                type="text"
                className="field-input"
                placeholder="What did you work on?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Description</label>
              <textarea
                className="field-input field-textarea"
                placeholder="Add more details about your work..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={2000}
                rows={4}
              />
              <span className="char-count">{description.length}/2000</span>
            </div>

            {error && <p className="form-error">{error}</p>}
          </div>

          <div className="add-note-form__actions">
            <button
              className="form-btn form-btn--primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner" />
              ) : (
                "Create Note"
              )}
            </button>
            <button className="form-btn form-btn--ghost" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNoteForm;
