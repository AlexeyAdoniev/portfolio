// src/AppServer.js
import React, { useState } from "react";
import pic from "../../assets/img/0.jpg";

const AppServer = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello from Server-Side Rendered React App!!!</h1>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <img src={pic} alt="pic" />
    </div>
  );
};

export default AppServer;
