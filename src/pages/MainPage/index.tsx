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

  if (!quotes || currentIndex === undefined) {
    throw new Error("Quotes or current index is undefined");
  }

  const isFavorite = quotes[currentIndex]?.isFavorite;

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes!.length);

    if (dispatchQuoteIndex) {
      dispatchQuoteIndex(randomIndex);
    }
  }

  function handleLike() {
    const newQuotes = (quotes ?? []).map((quote, index) => {
      if (currentIndex === index) {
        return { ...quote, likeCount: quote.likeCount + 1 };
      }
      return quote;
    });
    if (dispatchQuotes) {
      dispatchQuotes(newQuotes);
    }
  }

  function handleFavorite() {
    const updatedQuotes = (quotes ?? []).map((quote, index) => {
      if (currentIndex === index) {
        return { ...quote, isFavorite: !quote.isFavorite };
      }
      return quote;
    });
    if (dispatchQuotes) {
      dispatchQuotes(updatedQuotes);
    }
  }

  return (
    <main>
      <h1>Random Quote Generator</h1>
      <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likeCount={"Like : " + quotes[currentIndex].likeCount}
      />
      <Button
        label="Next quote"
        handleOnClick={handleNextQuoteClick}
        className={""}
      />
      <Button label="Like" handleOnClick={handleLike} className={""} />
      <Button
        handleOnClick={handleFavorite}
        label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={""}
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
              likeCount={"Like : " + quote.likeCount}
            />
          ))
      ) : (
        <p>No favorites added yet.</p>
      )}
    </main>
  );
};
