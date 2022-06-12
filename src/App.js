import { Suspense } from "react";
import Routes from "./router";

import { Top, NavBar, FullLoading } from "@/common";

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
    </div>
  );
}

export default App;
