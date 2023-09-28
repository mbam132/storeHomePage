import React, { useState } from 'react';
import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { debounce } from 'throttle-debounce';

function FetchingAndCaching() {
  // we avoid having to declare: 1. useEffect, 2. if statements, 3. error handlers
  // 4. saving to state vars, 5. implementing cache on our own
  const queryClient = useQueryClient();

  const { status, data, error, isFetching } = useFetchPosts();
  const [currentPostId, setCurrentPostId] = useState(-1);

  const renderPostsList = currentPostId === -1;

  const debouncedHandleSetPostId = debounce(1600, (id) => {
    setCurrentPostId(id);
  });

  return (
    <div>
      {renderPostsList && (
        <>
          <h1>Posts</h1>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'error' && <p>An error ocurred</p>}
          {status === 'success' && (
            <>
              {data.slice(0, 10).map((post) => (
                <>
                  <p>
                    id :{post.id}
                    {queryClient.getQueryData(['post', post.id]) !==
                      undefined && '(Cached)'}
                  </p>
                  <p>title: {post.title}</p>
                  <button
                    type="button"
                    className="bg-primary-300 rounded p-1 text-white"
                    onClick={() => {
                      debouncedHandleSetPostId(post.id ?? -1);
                    }}
                  >
                    Open details
                  </button>
                </>
              ))}
            </>
          )}
        </>
      )}

      {!renderPostsList && (
        <Post
          currentPostId={currentPostId}
          handleSetNoCurrentPost={() => {
            setCurrentPostId(-1);
          }}
        />
      )}
    </div>
  );
}

function useFetchPosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return data;
    },
  });
}

function Post({ currentPostId, handleSetNoCurrentPost }) {
  const { status, data, error, isFetching } = useFetchPost(currentPostId);

  return (
    <>
      <button
        type="button"
        className="bg-primary-300 rounded p-1 text-white"
        onClick={handleSetNoCurrentPost}
      >
        Go back
      </button>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>An error ocurred</p>}
      {status === 'success' && (
        <>
          <p>id: {data.userId}</p>
          <p>title: {data.title}</p>
          <p>body: {data.body}</p>
        </>
      )}
    </>
  );
}

function useFetchPost(postId) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );

      return data;
    },
  });
}

export default FetchingAndCaching;
