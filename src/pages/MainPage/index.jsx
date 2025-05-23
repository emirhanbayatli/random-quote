import { QuoteCard } from "../../components/QuoteCard";
import { Button } from "../../components/Button";

export const MainPage = ({
  quote,
  author,
  likeCount,
  handleNextQuoteClick,
  handleLikeQuoteClick,
}) => {
  return (
    <main>
      <h1>Random Quote Generator</h1>
      <QuoteCard quote={quote} author={author} likeCount={likeCount} />
      <Button
        label="Next Quote"
        handleOnClick={handleNextQuoteClick}
        className="btn"
      />
      <Button
        label="Like"
        handleOnClick={handleLikeQuoteClick}
        className="btn btn-like"
      />
    </main>
  );
};
