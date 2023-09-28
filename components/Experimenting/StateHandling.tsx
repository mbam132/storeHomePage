import React, { useState } from 'react';

function StateHandling() {
  const [count, setCount] = useState(0);
  const [obj, setObj] = useState({
    name: '',
    lastName: '',
    age: 0,
    location: '',
  });

  const increaseCounterByThree = () => {
    // the way to chain setting state and have the
    // state updated after each call
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);

    // this will not make the count var increased by 3
    // it will be increased by 1
    // setCount(count+1)
    // setCount(count+1)
    // setCount(count+1)
  };

  const handleUpdateName = (e) => {
    setObj((prev) => ({ ...prev, name: e.target.value }));
  };

  const increaseAgeByThree = (e) => {
    // the updater function receives the updated state
    // param between calls
    setObj((prev) => ({ ...prev, age: +prev.age + 1 }));
    setObj((prev) => ({ ...prev, age: +prev.age + 1 }));
    setObj((prev) => ({ ...prev, age: +prev.age + 1 }));
  };

  // with this way of maintaining 4 fields, you are not creating 4 different
  // state vars each one with an updater method
  const handleUpdateProperty = (e) => {
    setObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h3>Increase counter calling updater function 3 times</h3>
      <div className="d-flex">
        <button
          type="button"
          className="bg-primary-300 rounded p-1 text-white"
          onClick={increaseCounterByThree}
        >
          Increase
        </button>

        <span>count: {count}</span>
      </div>

      <h3>Update object name property only</h3>
      <input
        className="bg-black text-white"
        placeholder="Name"
        value={obj.name}
        onChange={handleUpdateName}
      />

      <h3>Increase age by 3 by calling updater function 3 times</h3>
      <button
        type="button"
        className="bg-primary-300 rounded p-1 text-white"
        onClick={increaseAgeByThree}
      >
        Increase age by 3
      </button>

      <h3> Modify each of the fields of the same object separately </h3>
      <div className="flex flex-col w-[30%] gap-y-2">
        <input
          className="bg-black text-white"
          placeholder="Name"
          name="name"
          value={obj.name}
          onChange={handleUpdateProperty}
        />
        <input
          className="bg-black text-white"
          placeholder="Last Name"
          value={obj.lastName}
          name="lastName"
          onChange={handleUpdateProperty}
        />
        <input
          className="bg-black text-white"
          placeholder="Age"
          value={obj.age}
          name="age"
          onChange={handleUpdateProperty}
        />
        <input
          className="bg-black text-white"
          placeholder="Location"
          value={obj.location}
          name="location"
          onChange={handleUpdateProperty}
        />
      </div>
      <p>Object: {JSON.stringify(obj)}</p>
    </div>
  );
}

export default StateHandling;
