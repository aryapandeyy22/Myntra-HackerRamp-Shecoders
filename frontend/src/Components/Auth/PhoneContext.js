import React, { createContext, useState } from 'react';

export const PhoneContext = createContext();

export const PhoneProvider = ({ children }) => {
  const [phone, setPhone] = useState('');

  return (
    <PhoneContext.Provider value={{ phone, setPhone }}>
      {children}
    </PhoneContext.Provider>
  );
};
