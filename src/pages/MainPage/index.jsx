import { QuoteCard } from "../../components/QuoteCard";
import { Button } from "../../components/Button";
import { useQuotesContext } from "../../QuotesContextProvider";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";
import { useState } from "react";
import { useFavoritesContext } from "../../FavoritesContext";

export const MainPage = () => {
  const quotes = useQuotesContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();
  const [updatedQuotes, setUpdatedQuotes] = useState(quotes);
  const { favorites, handleAddToFavorites } = useFavoritesContext();

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatchQuoteIndex(randomIndex);
  }
  function handleLike() {
    const newQuotes = updatedQuotes.map((quote, index) => {
      if (currentIndex === index) {
        return { ...quote, likeCount: quote.likeCount + 1 };
      } else return quote;
    });
    setUpdatedQuotes(newQuotes);
  }
  return (
    <main>
      <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        like="Likes :"
        likeCount={updatedQuotes[currentIndex].likeCount}
      />

      <Button label="Next quote" handleOnClick={handleNextQuoteClick} />
      <Button
        label="Like"
        handleOnClick={handleLike}
        className="bg-green-400 hover:bg-green-500"
      />

      <Button label="Add Favorites" handleOnClick={handleAddToFavorites} />
      <h1>Your Favorite List</h1>
      {favorites.length > 0 ? (
        favorites.map((favorite, index) => (
          <QuoteCard
            key={index}
            quote={favorite.quote}
            author={favorite.author}
          />
        ))
      ) : (
        <p>No favorites added yet.</p>
      )}
    </main>
  );
};
