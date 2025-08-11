import React from "react";
import ReactDOM from "react-dom/client"; //18버전용
// import ReactDOM from "react-dom"; // 17버전용
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// react-dom/client 는 v18에서 새로 생긴 모듈이다.
// React v18 버전부터는 이 모듈을 이용해 DOM을 렌더링 한다.
//
// React v18 이전 버전은 다른 모듈(react-dom)을 사용하여 렌더링 한다.
// 이걸 회귀 시켜주면 된다.(아주 간단하다)

// react v 18 버전 용
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
);

// react v 17 버전용
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// console.log(reportWebVitals());
