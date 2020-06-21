import React from "react";
import "../static.css";

function App() {



    return (
        <>
        <p>{count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        </>
);
}

export default App;