// src/App.tsx
import React, {Suspense} from "react";
import { MFButton } from "./MFButton";

const App = () => {
  return (<>
    <h1>Hello, React + TypeScript + Webpack!</h1>
    <Suspense>
      <MFButton/>
    </Suspense>
  </>);
};

export default App;
