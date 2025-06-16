import { QuoteCard } from "../../components/QuoteCard";
import { useQuotesContext } from "../../QuotesContextProvider";
import { Button } from "../../components/Button";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";
import { useQuotesDispatchContext } from "../../QuotesContextProvider";
import { QuotesActionType } from "../../QuotesContextProvider";
import { useState } from "react";

export const MainPage = () => {
  const dispatchQuotes = useQuotesDispatchContext();
  const quotes = useQuotesContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();
  const [error, setError] = useState("");

  if (!quotes || currentIndex === undefined) {
    throw new Error("Quotes or current index is undefined");
  }

  const isFavorite = quotes[currentIndex]?.isFavorite;

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * (quotes?.length ?? 0));

    if (dispatchQuoteIndex) {
      dispatchQuoteIndex(randomIndex);
    }
  }
  const dispatch = useQuotesDispatchContext();
  const currentQute = quotes[currentIndex];
  function handleLike() {
    if (dispatch) {
      dispatch({
        type: QuotesActionType.LIKE_QUOTE,
        payload: { quote: currentQute.quote },
      });
    }
  }

  function handleDislike() {
    if (currentQute.likedBy <= 0) {
      setError("Cannot dislike the quote.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (dispatch) {
      dispatch({
        type: QuotesActionType.DISLIKE_QUOTE,
        payload: { quote: currentQute.quote },
      });
    }
  }

  function handleFavorite() {
    if (dispatch) {
      dispatch({
        type: QuotesActionType.ADD_FAVORITE_QUOTE,
        payload: { quote: currentQute.quote },
      });
    }
  }

  return (
    <main>
      <h1>Random Quote Generator</h1>
      <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likedBy={quotes[currentIndex].likedBy}
      />
      <Button label="Like" handleOnClick={handleLike} />
      <Button label="Dislike" handleOnClick={handleDislike} />

      <Button label="Next quote" handleOnClick={handleNextQuoteClick} />
      <Button
        handleOnClick={handleFavorite}
        label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      />

      <h1>Your Favorite List</h1>
      {quotes.some((quote) => quote.isFavorite) ? (
        quotes
          .filter((quote) => quote.isFavorite)
          .map((quote, index) => (
            <QuoteCard
              key={index}
              quote={quote.quote}
              author={quote.author}
              likedBy={quote.likedBy}
            />
          ))
      ) : (
        <p>No favorites added yet.</p>
      )}

      {error && (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto">
          {error}
        </p>
      )}
    </main>
  );
};
