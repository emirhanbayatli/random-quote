import { createContext, useState, useContext } from "react";
import { quotes as intialQuotes } from "./quotes";

export const QuotesContext = createContext(undefined);
export const QuotesDispatchContext = createContext(undefined);

export const QuotesContextProvider = ({ children }) => {
  const [quotes, setQuotes] = useState(intialQuotes);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={setQuotes}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
