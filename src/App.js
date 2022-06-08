import { Suspense } from "react";
import Routes from "./router";

import Top from "./common/Top";
import NavBar from "./common/nav-bar/NavBar";
import Loading from "./common/Loading";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Top />
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
      <NavBar />
    </div>
  );
}

export default App;
