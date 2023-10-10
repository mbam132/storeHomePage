import GQLClient from './GQLClient';
import { JWT_LOCAL_STORAGE_KEY } from '../utils/constants';

async function login(email: string, password: string) {
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

  const user = requestResult[mutationName].data.user;

  return user;
}

async function verifyToken(value: string) {
  const mutationName = 'verifyJwt';
  const mutation = `
    mutation{
      ${mutationName}(value: "${value}"){
        ...on Error {
          message
        }

        ...on MutationVerifyJwtSuccess{
          data{
            name
            email
            authScope
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

  const user = requestResult[mutationName].data;
  return user;
}

export { login, verifyToken };
