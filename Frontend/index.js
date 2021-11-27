import React, { StrictMode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import App from "./src/App";
import CircularSpinner from "./src/components/FacebookCircularProgress";

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<CircularSpinner />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
  document.getElementById("app")
);
