import React, { useState, useEffect } from "react";
import axios from "axios";
import Quote from "../components/Qoute";
import Pagination from "../components/Pagination";
import "./styles/Home.css";

const Home = () => {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/quotes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          page,
          pageSize: 5,
        },
      });
      setQuotes(response.data.quotes);
      setTotalPages(Math.ceil(response.data.quotesCount / 5));
    } catch (err) {
      console.error("Failed to fetch quotes", err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [page]);

  const handleVote = (quoteId, newVote) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => {
        if (quote.id === quoteId) {
          let upvotesCount = quote.upvotesCount;
          let downvotesCount = quote.downvotesCount;

          if (quote.givenVote === "upvote") upvotesCount--;
          if (quote.givenVote === "downvote") downvotesCount--;

          if (newVote === "upvote") upvotesCount++;
          if (newVote === "downvote") downvotesCount++;

          return {
            ...quote,
            upvotesCount,
            downvotesCount,
            givenVote: newVote,
          };
        }
        return quote;
      })
    );
  };

  return (
    <div className="home-container">
      <div className="quote-list">
        {quotes.map((quote) => (
          <Quote key={quote.id} quote={quote} onVote={handleVote} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default Home;
