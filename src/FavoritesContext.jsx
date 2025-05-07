import { useState, createContext, useContext } from "react";
import { useQuoteIndexContext } from "./QuoteIndexContextProvider";
import { useQuotesContext } from "./QuotesContextProvider";

export const FavoritesContext = createContext(undefined);

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const currentIndex = useQuoteIndexContext();
  const quotes = useQuotesContext();
  const selectedQuote = quotes[currentIndex];
  function handleAddToFavorites() {
    const isAlreadyFavorite = favorites.some(
      (quote) => quote.quote === selectedQuote.quote,
    );
    if (!isAlreadyFavorite) {
      setFavorites((prevFavorites) => [...prevFavorites, selectedQuote]);
      console.log("Added to favorites:", selectedQuote);
    } else {
      console.log("This quote is already in your favorites.");
    }
  }
  return (
    <FavoritesContext.Provider value={{ handleAddToFavorites, favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavoritesContext = () => useContext(FavoritesContext);
