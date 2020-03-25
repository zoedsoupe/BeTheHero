import React, { useState } from "react";

import Header from "./Header";

function App() {
  const [i, setI] = useState(0);

  //Array [valor, value update function]

  function increment() {
    setI(i + 1);
  }
  return (
    <div>
      <Header>Contador: {i}</Header>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}

export default App;
