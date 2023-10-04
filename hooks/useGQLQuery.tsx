import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';

import { GRAPHQL_REQUEST_URL } from '../utils/constants';

function useGQLQuery({ query, queryName }) {
  const [queryData, setQueryData] = useState(null);
  const [queryErrorMessage, setQueryErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const requestResult: any = await request(GRAPHQL_REQUEST_URL, query);

        const anErrorOcurred: boolean = !!requestResult[queryName].message;
        if (anErrorOcurred) {
          throw new Error(requestResult[queryName].message);
        }

        setQueryData(requestResult[queryName]);
      } catch (error) {
        setQueryErrorMessage(error.message);
      }
    })();
  }, []);

  return { queryData, queryErrorMessage };
}

export default useGQLQuery;
