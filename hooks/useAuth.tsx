import React from 'react';
import GQLClient from '../services/GQLClient';
import { useDispatch } from 'react-redux';
import { JWT_LOCAL_STORAGE_KEY } from '../utils/constants';
import useUser from './useUser';
import { IUser } from '../utils/types';
import { deleteAllTasks } from '../store';

function useAuth() {
  const dispatch = useDispatch();
  const { setUser } = useUser();

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<IUser> => {
    const mutationName = 'signUp';
    const mutation = `
      mutation {
        ${mutationName}(email: "${email}", password: "${password}", name: "${name}"){
          ...on Error{
            message
          }

          ...on MutationSignUpSuccess{
            data{
              email
            }
          }
        }
      }
    `;
    const requestResult: any = await GQLClient.request(mutation);

    const anErrorOcurred: boolean = !!requestResult[mutationName].message;

    if (anErrorOcurred) {
      throw new Error(requestResult[mutationName].message);
    }

    const userCreated: IUser = requestResult[mutationName].data;

    return userCreated;
  };

  const login = async (email: string, password: string): Promise<IUser> => {
    const mutationName = 'login';
    const mutation = `
        mutation {
          ${mutationName}(email: "${email}", password: "${password}"){
            ... on Error{
              message
            }

            ... on MutationLoginSuccess{
              data {
                jwt
                user{
                  name
                  email
                  authScope
                }
              }
            }
          }
        }`;

    const requestResult: any = await GQLClient.request(mutation);

    const anErrorOcurred: boolean = !!requestResult[mutationName].message;
    if (anErrorOcurred) {
      throw new Error(requestResult[mutationName].message);
    }

    const token = requestResult[mutationName].data.jwt;

    GQLClient.setHeader('authorization', `Bearer ${token}`);
    window.localStorage.setItem(JWT_LOCAL_STORAGE_KEY, token);

    const user: IUser = requestResult[mutationName].data.user;

    setUser({ ...user });

    return user;
  };

  const logOut = () => {
    setUser(null);
    dispatch(deleteAllTasks());
    window.localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
    GQLClient.setHeader('authorization', '');
  };

  return { login, logOut, signUp };
}

export default useAuth;
