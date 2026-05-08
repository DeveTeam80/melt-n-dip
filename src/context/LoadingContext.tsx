"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: (val: boolean) => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);