import React, { useEffect, useState } from 'react';
import GQLClient from '../services/GQLClient';

function useGQLQuery({ query, queryName }) {
  const [queryData, setQueryData] = useState(null);
  const [queryErrorMessage, setQueryErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const requestResult: any = await GQLClient.request(query);

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
