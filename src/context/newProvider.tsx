import React, { createContext, useContext, useState } from "react";

// Create a new context
const NewContext = createContext<{
  state: null;
  setState: React.Dispatch<React.SetStateAction<null>>;
} | null>(null);

// Create a provider for the new context
export const NewProvider = ({ children }) => {
  const [state, setState] = useState<null>(null); // Replace null with your initial state

  return (
    <NewContext.Provider value={{ state, setState }}>
      {children}
    </NewContext.Provider>
  );
};

// Create a custom hook to use the new context
export const useNewContext = () => {
  const context = useContext(NewContext);
  if (context === undefined) {
    throw new Error("useNewContext must be used within a NewProvider");
  }
  return context;
};
