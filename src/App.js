import "./App.css";
import { QuoteCard } from "./Components/QuoteCard/index.js";
import { quotes as initialQuotes } from "./quotes.js";
import { useState } from "react";

function App() {
  const [quotes, setquotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);

  function handleClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentIndex(randomIndex);
  }
  function handleLike() {
    let counter = initialQuotes[currentIndex].likeCount === count;
    setCount(counter + 1);
    console.log(counter);
  }

  console.log(initialQuotes[currentIndex].count);

  return (
    <div className="App">
      <QuoteCard
        quote={initialQuotes[currentIndex].quote}
        author={initialQuotes[currentIndex].author}
        count={initialQuotes[currentIndex].count}
      />
      <button onClick={handleClick}>Get Random Quote</button>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}

export default App;
