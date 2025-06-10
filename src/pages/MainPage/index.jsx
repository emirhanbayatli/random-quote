import { QuoteCard } from "../../components/QuoteCard";
import { useQuotesContext } from "../../QuotesContextProvider";
import { Button } from "../../components/Button";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";
import { useQuotesDispatchContext } from "../../QuotesContextProvider";

export const MainPage = () => {
  const dispatchQuotes = useQuotesDispatchContext();
  const quotes = useQuotesContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();
  const isFavorite = quotes[currentIndex]?.isFavorite;
  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatchQuoteIndex(randomIndex);
  }

  function handleLike() {
    const newQuotes = quotes.map((quote, index) => {
      if (currentIndex === index) {
        return { ...quote, likeCount: quote.likeCount + 1 };
      }
      return quote;
    });
    dispatchQuotes(newQuotes);
  }

  function handleFavorite() {
    const updatedQuotes = quotes.map((quote, index) => {
      if (currentIndex === index) {
        return { ...quote, isFavorite: !quote.isFavorite };
      }
      return quote;
    });
    dispatchQuotes(updatedQuotes);
  }

  return (
    <main>
      <h1>Random Quote Generator</h1>
      <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likeCount={"Like : " + quotes[currentIndex].likeCount}
      />
      <Button label="Next quote" handleOnClick={handleNextQuoteClick} />
      <Button label="Like" handleOnClick={handleLike} />
      <Button
        handleOnClick={handleFavorite}
        label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      />

      <h1>Your Favorite List</h1>
      {quotes.some((quote) => quote.isFavorite) ? (
        quotes
          .filter((quote) => quote.isFavorite)
          .map((quote, index) => (
            <QuoteCard key={index} quote={quote.quote} author={quote.author} />
          ))
      ) : (
        <p>No favorites added yet.</p>
      )}
    </main>
  );
};
