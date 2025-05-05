import "./App.css";
import { quotes as initialQuotes } from "./quotes.js";
import { useState } from "react";
import { ProfilePage } from "./pages/ProfilePage/index.jsx";
import { MainPage } from "./pages/MainPage/index.jsx";

const pages = {
  home: "Home",
  profile: "Profile",
};

function App() {
  const [quotes, setquotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(pages.home);
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
      <nav className="nav">
        <ul>
          <li>
            <button onClick={() => setCurrentPage(pages.home)}>
              {pages.home}
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage(pages.profile)}>
              {pages.profile}
            </button>
          </li>
        </ul>
      </nav>
      {currentPage === pages.home ? (
        <MainPage
          quote={quotes[currentIndex].quote}
          author={quotes[currentIndex].author}
          likeCount={quotes[currentIndex].likeCount}
          handleNextQuoteClick={handleClick}
          handleLikeQuoteClick={handleLike}
        />
      ) : (
        <ProfilePage />
      )}

      {/* <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likeCount={quotes[currentIndex].likeCount}
      />
      <Button
        label="Get Random Quote"
        handleOnClick={handleClick}
        className="btn"
      />
      <Button
        label="Like"
        handleOnClick={handleLike}
        className="btn btn-like"
      />
      <ProfilePage /> */}
    </div>
  );
}

export default App;
