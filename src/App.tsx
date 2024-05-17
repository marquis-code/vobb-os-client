import { useEffect } from "react";
import { MainRouter } from "router";

function App() {
  useEffect(() => {
    console.log("hi");
  }, []);
  return <MainRouter />;
}

export default App;
