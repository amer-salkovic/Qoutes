import React, { useState } from "react";
import axios from "axios";
import "./styles/NewQuote.css";

const NewQuote = () => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/quotes",
        {
          content,
          author,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // Redirect to home or clear the form
    } catch (err) {
      console.error("Failed to add quote", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-quote-form">
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Quote</button>
    </form>
  );
};

export default NewQuote;
