import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./styles/Quote.css";

function Quote({ quote, onVote }) {
  const { id, content, author, upvotesCount, downvotesCount, givenVote } =
    quote;

  const getPercentage = () => {
    const totalVotes = upvotesCount + downvotesCount;
    return totalVotes === 0 ? 0 : Math.round((upvotesCount / totalVotes) * 100);
  };

  const percentage = getPercentage();

  const handleUpvote = async () => {
    try {
      if (givenVote === "upvote") {
        await axios.delete(`http://localhost:8000/quotes/${id}/upvote`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        onVote(id, "none");
      } else {
        if (givenVote === "downvote") {
          await axios.delete(`http://localhost:8000/quotes/${id}/downvote`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
        }
        await axios.post(
          `http://localhost:8000/quotes/${id}/upvote`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        onVote(id, "upvote");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownvote = async () => {
    try {
      if (givenVote === "downvote") {
        await axios.delete(`http://localhost:8000/quotes/${id}/downvote`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        onVote(id, "none");
      } else {
        if (givenVote === "upvote") {
          await axios.delete(`http://localhost:8000/quotes/${id}/upvote`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
        }
        await axios.post(
          `http://localhost:8000/quotes/${id}/downvote`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        onVote(id, "downvote");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="quote-container">
      <div className="vote-section">
        <FontAwesomeIcon
          icon={faArrowUp}
          onClick={handleUpvote}
          className={`vote-button ${givenVote === "upvote" ? "active" : ""}`}
        />
        <div
          className={`percentage ${
            percentage >= 75
              ? "green"
              : percentage >= 50
              ? "yellowgreen"
              : percentage >= 25
              ? "orange"
              : "red"
          }`}
        >
          {percentage}%
          <div className="votes">
            {upvotesCount} / {downvotesCount}
          </div>
        </div>
        <FontAwesomeIcon
          icon={faArrowDown}
          onClick={handleDownvote}
          className={`vote-button ${givenVote === "downvote" ? "active" : ""}`}
        />
      </div>
      <div className="quote">
        <div className="content-section">
          <p>{content}</p>
          <p className="author">— {author}</p>
        </div>
      </div>
    </div>
  );
}

export default Quote;
