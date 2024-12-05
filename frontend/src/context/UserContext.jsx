import React, { createContext, useState } from "react";

// Create User Context
export const UserDataContext = createContext({
  user: null,
  setUser: () => {},
});

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;