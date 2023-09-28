import React, { useEffect } from 'react';
import { createClient } from 'graphql-sse';
import { GRAPHQL_REQUEST_URL } from '../utils/constants';

function UseSubscription({ query, onReceivedMessage }) {
  const subscriptionClient = createClient({
    url: GRAPHQL_REQUEST_URL,
  });

  const _onReceivedMessage = (data) => onReceivedMessage(data.data);

  let unSubscribe = () => {};

  useEffect(() => {
    (async () => {
      await new Promise((resolve, reject) => {
        unSubscribe = subscriptionClient.subscribe(
          {
            query: query,
          },
          {
            next: _onReceivedMessage,
            error: reject,
            complete: () => resolve('subscription completed'),
          }
        );
      });
    })();
  }, []);

  return { unSubscribe };
}

export default UseSubscription;
