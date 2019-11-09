import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';



export const CreelSideContext = createContext();
export const CreelSideContextProvider = ({ children, initialValue }) => (
  <CreelSideContext.Provider value={useState(() => initialValue)}>
    {children}
  </CreelSideContext.Provider>
);
