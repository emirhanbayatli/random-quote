import { QuoteCard } from "../../components/QuoteCard";
import { Button } from "../../components/Button";
import { useQuotesContext } from "../../QuotesContextProvider";
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

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatchQuoteIndex(randomIndex);
  }
  function handleLike() {
    const newQuotes = quotes.map((quote, index) => {
      if (currentIndex === index) {
        return { ...quote, likeCount: quote.likeCount + 1 };
      } else return quote;
    });
    dispatchQuotes(newQuotes);
  }

  function handleFavorite() {
    const updatedQuotes = quotes.map((quote, index) => {
      console.log(currentIndex);

      if (currentIndex === index) {
        return { ...quote, isFavorite: !quote.isFavorite };
      } else return quote;
    });
    dispatchQuotes(updatedQuotes);
  }

  return (
    <main>
      <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likeCount={"Like : " + quotes[currentIndex].likeCount}
      />

      <Button
        label="Next quote"
        handleOnClick={handleNextQuoteClick}
        className="btn"
      />
      <Button
        label="Like"
        handleOnClick={handleLike}
        className="btn btn-like"
      />

      <Button
        label="Add Favorites"
        handleOnClick={handleFavorite}
        className="btn"
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
