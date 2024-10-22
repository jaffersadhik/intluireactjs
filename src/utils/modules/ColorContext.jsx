// src/contexts/ColorContext.js
import React, { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Create a context for color values
const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const adminColors = useSelector((state) => ({
    adminColor1: state.Auth?.colourapi || '#4287f5', 
    adminColor2: state.Auth?.hovercolourapi || '#20b01e',
 
    adminTabletext: state.Auth?.admin_text_color7x || '#00000',
    admininnerbody1: state.Auth?.admin_text_color7x || '#8d8f96',

    admininnerbody2: state.Auth?.admin_text_color7xx || '#c3c6d6',


  }));

  // Update CSS custom properties when adminColors changes
  useEffect(() => {
    document.documentElement.style.setProperty('--admin-color1', adminColors.adminColor1);
    document.documentElement.style.setProperty('--admin-color2', adminColors.adminColor2);

    document.documentElement.style.setProperty('--admin-table-text', adminColors.adminTabletext);
    document.documentElement.style.setProperty('--admin-inner-body1', adminColors.admininnerbody1);
    document.documentElement.style.setProperty('--admin-inner-body2', adminColors.admininnerbody2);



  }, [adminColors]);

  return (
    <ColorContext.Provider value={adminColors}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook to use color context
export const useColors = () => useContext(ColorContext);
