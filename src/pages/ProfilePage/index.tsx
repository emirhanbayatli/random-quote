import {
  useQuotesContext,
  useQuotesDispatchContext,
} from "../../QuotesContextProvider";
import { useState } from "react";
import { Quote } from "../../types";
import { QuotesActionType } from "../../QuotesContextProvider";

export const ProfilePage = () => {
  const quotes = useQuotesContext();
  const dispatch = useQuotesDispatchContext();
  const [error, setError] = useState("");

  function handleClick(currentQuote: Quote) {
    if (currentQuote.likedBy <= 0) {
      setError("Cannot dislike the quote.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (dispatch) {
      dispatch({
        type: QuotesActionType.DISLIKE_QUOTE,
        payload: { quote: currentQuote.quote },
      });
    }
  }

  return (
    <main>
      <h1>Profile page</h1>
      <div>Use information placeholder ....</div>
      <h2>Liked quotes</h2>
      {error && (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto">
          {error}
        </p>
      )}
      {quotes && quotes.length > 0 ? (
        quotes.map((quote) => (
          <section
            key={quote.id}
            className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 max-w-2xl my-5 mx-auto rounded-md p-10 text-lg"
          >
            <p>{quote.quote}</p>
            <p>{quote.author}</p>
            <p>{quote.likedBy}</p>
            <button onClick={() => handleClick(quote)}>Dislike</button>
          </section>
        ))
      ) : (
        <></>
      )}
    </main>
  );
};
