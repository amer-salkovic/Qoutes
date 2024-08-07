import React from "react";
import Quote from "./Qoute";

const QuoteList = ({ quotes, fetchQuotes }) => (
  <div className="quote-list">
    {quotes.map((quote) => (
      <Quote key={quote.id} quote={quote} fetchQuotes={fetchQuotes} />
    ))}
  </div>
);

export default QuoteList;
