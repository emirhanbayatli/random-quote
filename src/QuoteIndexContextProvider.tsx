import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

export const QuoteIndexContext = createContext<number | undefined>(undefined);
export const QuoteIndexDispatchContext = createContext<Dispatch<SetStateAction<number>> | undefined>(undefined);

export const QuoteIndexContextProvider = ({ children }: { children: ReactNode }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  return (
    <QuoteIndexContext value={quoteIndex}>
      <QuoteIndexDispatchContext value={setQuoteIndex}>
        {children}
      </QuoteIndexDispatchContext>
    </QuoteIndexContext>
  );
};

export const useQuoteIndexContext = () => useContext(QuoteIndexContext);
export const useQuoteIndexDispatchContext = () =>
  useContext(QuoteIndexDispatchContext);
