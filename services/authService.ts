import GQLClient from './GQLClient';

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

export { verifyToken };
