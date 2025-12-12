import { QuoteCard } from "../../components/QuoteCard";
import { useQuotesContext } from "../../QuotesContextProvider";
import { Button } from "../../components/Button";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";
import { useQuotesDispatchContext } from "../../QuotesContextProvider";
import { QuotesActionType } from "../../QuotesContextProvider";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { toggleDislike, toggleLike } from "../../utils";

export const MainPage = () => {
  const quotes = useQuotesContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();
  const authContext = useContext(AuthContext);

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userID = authContext?.user?.uid;

  if (!quotes || currentIndex === undefined) {
    throw new Error("Quotes or current index is undefined");
  }

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message, error]);

  const isFavorite = quotes[currentIndex]?.isFavorite;

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * (quotes?.length ?? 0));

    if (dispatchQuoteIndex) {
      dispatchQuoteIndex(randomIndex);
    }
  }
  const dispatch = useQuotesDispatchContext();
  const currentQute = quotes[currentIndex];

  async function handleLike() {
    const result = await toggleLike(currentQute.id, userID as string);
    if (result.success) {
      setMessage(result.message);
    } else {
      setError(result.message);
    }
  }

  async function handleDislike() {
    const result = await toggleDislike(currentQute.id, userID as string);
    if (result.success) {
      setMessage(result.message);
    } else {
      setError(result.message);
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
        likedBy={quotes[currentIndex].likedBy.length}
        dislikedBy={quotes[currentIndex].dislikedBy.length}
      />
      <Button label="Like" handleOnClick={handleLike} />
      <Button
        label="Dislike"
        handleOnClick={handleDislike}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      />

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
              likedBy={quote.likedBy.length}
              dislikedBy={quote.dislikedBy.length}
            />
          ))
      ) : (
        <p>No favorites added yet.</p>
      )}

      {message && (
        <p
          className={`text-sm mt-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-3 max-w-lg mx-auto text-center`}
        >
          {message}
        </p>
      )}
      {error && (
        <p
          className={
            "text-sm mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto text-center"
          }
        >
          {error}
        </p>
      )}
    </main>
  );
};
