import { createContext, useState, useContext , ReactNode } from "react";
import { quotes as intialQuotes } from "./quotes";
import { Quote } from "./types";
import { Dispatch, SetStateAction } from "react";

export const QuotesContext = createContext<Quote[] | undefined>(undefined);
export const QuotesDispatchContext = createContext<Dispatch<SetStateAction<Quote[]>> | undefined>(undefined);

interface QuoteIndexContextProviderProps {
  children: ReactNode;
}

export const QuotesContextProvider = ({ children }: QuoteIndexContextProviderProps) => {
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
