import React, { useState, useEffect, createContext, useContext } from 'react';
import { verifyToken } from '../services/authService';
import { JWT_LOCAL_STORAGE_KEY } from '../utils/constants';
import { IUser } from '../utils/types';
import GQLClient from '../services/GQLClient';

interface IContext {
  user: IUser;
  isLoading: boolean;
  verifyJwtAndExtractProperties: () => Promise<void>;
  setUser: (user: IUser) => void;
}

const UserContext = createContext<IContext>({} as IContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const verifyJwtAndExtractProperties = async () => {
    const savedToken: string = window.localStorage.getItem(
      JWT_LOCAL_STORAGE_KEY
    );

    if (!savedToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const user = await verifyToken(savedToken);

      GQLClient.setHeader('authorization', `Bearer ${savedToken}`);
      setUser({ ...user });
    } catch (error) {
      //token not valid or expired
      console.error(error.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyJwtAndExtractProperties();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoading, setUser, verifyJwtAndExtractProperties }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const { user, isLoading, setUser, verifyJwtAndExtractProperties } =
    useContext(UserContext);
  const loggedIn: boolean = !isLoading && !!user;

  return { user, isLoading, setUser, loggedIn, verifyJwtAndExtractProperties };
}

export default useUser;
