import React, { useState, useEffect } from "react";
import axios from "axios";
import Quote from "../components/Quote";
import "./QuotesPage.css";

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/quotes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setQuotes(response.data.quotes);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuotes();
  }, []);

  const handleVote = (quoteId, voteType) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === quoteId
          ? {
              ...quote,
              upvotesCount:
                voteType === "upvote"
                  ? quote.upvotesCount + 1
                  : quote.givenVote === "upvote"
                  ? quote.upvotesCount - 1
                  : quote.upvotesCount,
              downvotesCount:
                voteType === "downvote"
                  ? quote.downvotesCount + 1
                  : quote.givenVote === "downvote"
                  ? quote.downvotesCount - 1
                  : quote.downvotesCount,
              givenVote: voteType,
            }
          : quote
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quotes-page">
      {quotes.map((quote) => (
        <Quote key={quote.id} quote={quote} onVote={handleVote} />
      ))}
    </div>
  );
};

export default QuotesPage;
