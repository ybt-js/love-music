import { Suspense } from "react";
import Routes from "./router";

import { Top, NavBar, FullLoading } from "@/common";
import { Player } from "components";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Top />
      <main className="wrapper">
        <Suspense fallback={<FullLoading />}>
          <Routes />
        </Suspense>
      </main>
      <NavBar />
      <Player />
    </div>
  );
}

export default App;
