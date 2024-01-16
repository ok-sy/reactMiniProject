import React from "react";
// import ReactDOM from "react-dom/client"; 18버전용
import ReactDOM from "react-dom"; // 17버전용
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

console.log(reportWebVitals());
