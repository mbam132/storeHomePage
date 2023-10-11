import React, { useState } from 'react';
import GQLClient from '../../services/GQLClient';
import useSubscription from '../../hooks/useSubscription';
import useAuth from '../../hooks/useAuth';

function HandleUsers() {
  const { signUp } = useAuth();
  const secondsToDisplayData: number = 9;
  const [allUsers, setAllUsers] = useState([]);

  const [userToCreate, setUserToCreate] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSetUserToCreate = (e) => {
    setUserToCreate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [userToDeleteEmail, setUserToDeleteEmail] = useState('');

  const [displayUserCreatedMessage, setDisplayUserCreatedMessage] =
    useState(false);
  const [displayUserDeletedMessage, setDisplayUserDeletedMessage] =
    useState(false);

  const [usersActionsLog, setUsersActionsLog] = useState([]);

  const handleCreatedUserSubscriptionMessage = (data) => {
    setUsersActionsLog((prev) => [...prev, { ...data?.userUpdate }]);
  };

  const subscriptionQuery = `subscription{
        userUpdate{
          action
          user{
            id
            name
            email
          }
        }
      }
    `;

  const { unSubscribe } = useSubscription({
    query: subscriptionQuery,
    onReceivedMessage: handleCreatedUserSubscriptionMessage,
  });

  const handleFetchAllUsers = async () => {
    try {
      const query = `
        {
          allUsers {
            ... on Error {
              message
            }

            ... on QueryAllUsersSuccess {
              data {
                id
                name
                email
              }
            }
          }
        }
      `;

      const requestResult: any = await GQLClient.request(query);

      const anErrorOcurred: boolean = !!requestResult.allUsers.message;
      if (anErrorOcurred) {
        throw new Error(requestResult.allUsers.message);
      }

      setAllUsers([...requestResult.allUsers.data]);
      setTimeout(() => {
        setAllUsers([]);
      }, secondsToDisplayData * 1000);
    } catch (error) {
      console.log('An error ocurred with fetching all the users');
      console.log(error.message);
    }
  };

  const handleCreateUser = async () => {
    try {
      await signUp(
        userToCreate.email,
        userToCreate.password,
        userToCreate.name
      );

      setUserToCreate({ name: '', email: '', password: '' });
      setDisplayUserCreatedMessage(true);

      setTimeout(() => {
        setDisplayUserCreatedMessage(false);
      }, secondsToDisplayData * 1000);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    const mutationName = 'deleteUser';
    const mutationQuery = `
    mutation{
      ${mutationName}(email: "${userToDeleteEmail}"){
        ... on Error{
          message
        }

        ... on MutationDeleteUserSuccess{
          data{
            id
            name
            email
          }
        }
      }
    }
    `;

    try {
      const requestResult: any = await GQLClient.request(mutationQuery);

      const anErrorOcurred: boolean = !!requestResult[mutationName].message;
      if (anErrorOcurred) {
        throw new Error(requestResult[mutationName].message);
      }
      setUserToDeleteEmail('');
      setDisplayUserDeletedMessage(true);

      setTimeout(() => {
        setDisplayUserDeletedMessage(false);
      }, secondsToDisplayData * 1000);
    } catch (error) {
      console.log('An error ocurred deleting a user');
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <h2>Users admin panel</h2>

      <div className="flex">
        <div className="flex flex-col">
          <h3>Create a user</h3>
          <input
            className="w-[140px]"
            type="text"
            name="name"
            placeholder="Name"
            value={userToCreate.name}
            onChange={handleSetUserToCreate}
          />

          <input
            className="w-[140px]"
            type="text"
            name="email"
            placeholder="Email"
            value={userToCreate.email}
            onChange={handleSetUserToCreate}
          />
          <input
            className="w-[140px]"
            type="text"
            name="password"
            placeholder="Password"
            value={userToCreate.password}
            onChange={handleSetUserToCreate}
          />
          <div className="flex">
            <button
              type="button"
              className="w-[140px] bg-primary-300"
              onClick={handleCreateUser}
            >
              Create
            </button>
          </div>

          {displayUserCreatedMessage && <span>The user was created</span>}
        </div>

        <div className="flex flex-col ml-[160px]">
          <h3>Delete a user</h3>
          <input
            className="w-[140px]"
            type="text"
            name="email"
            placeholder="Email"
            value={userToDeleteEmail}
            onChange={(e) => {
              setUserToDeleteEmail(e.target.value);
            }}
          />
          <div className="flex">
            <button
              type="button"
              className="w-[140px] bg-primary-300"
              onClick={handleDeleteUser}
            >
              Delete
            </button>
          </div>

          {displayUserDeletedMessage && <span>The user was deleted</span>}
        </div>
      </div>

      <button type="button" onClick={handleFetchAllUsers}>
        Fetch all users
      </button>
      {allUsers.length > 0 && (
        <div>
          <h2 className="text-primary-300"> Fetched all users list</h2>
          {allUsers.map((user, index) => (
            <div key={index} className="mb-[8px]">
              <h3>UserId: {user.id}</h3>
              <p>name: {user.name}</p>
              <p>email: {user.email}</p>
            </div>
          ))}
        </div>
      )}

      {usersActionsLog.length > 0 && (
        <>
          <h2 className="text-primary-300"> Users actions log</h2>
          {usersActionsLog.map((update, index) => (
            <div key={index}>
              <h3>UserId: {update.user?.id}</h3>
              <p>action: {update.action}</p>
              <p>name: {update.user?.name}</p>
              <p>email: {update.user?.email}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default HandleUsers;
