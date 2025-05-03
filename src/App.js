import "./App.css";
import { QuoteCard } from "./Components/QuoteCard/index.js";
import { quotes as initialQuotes } from "./quotes.js";
import { useState } from "react";

function App() {
  const [quotes, setquotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentIndex(randomIndex);
  }
  function handleLike() {
    const updatedQuotes = quotes.map((quote, index) => {
      if (currentIndex === index) {
        return { ...quote, likeCount: quote.likeCount + 1 };
      } else return quote;
    });
    setquotes(updatedQuotes);
  }

  console.log(quotes[currentIndex].likeCount);

  return (
    <div className="App">
      <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likeCount={quotes[currentIndex].likeCount}
      />
      <button className="btn" onClick={handleClick}>
        Get Random Quote
      </button>
      <button className="btn btn-like" onClick={handleLike}>
        Like
      </button>
    </div>
  );
}

export default App;
