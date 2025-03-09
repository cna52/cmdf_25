import React, { createContext, useState, useContext } from 'react';

// Create the User Context
const UserContext = createContext();

// Create the UserProvider to wrap the app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information here

  const updateUser = (userData) => {
    setUser(userData); // Function to update user information
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context in any component
export const useUser = () => useContext(UserContext);
