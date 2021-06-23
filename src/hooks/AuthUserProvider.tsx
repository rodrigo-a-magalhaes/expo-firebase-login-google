import React, { useState, createContext, ReactNode } from 'react';

type AuthContextData = {
  user: any;
  setUser: any;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthUserContext = createContext({} as AuthContextData);
export const AuthUserProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);

  return (
    <AuthUserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </AuthUserContext.Provider>
  );
};
