import { useEffect } from "react";
import "./App.css";
import MainPage from "./pages/MainPage";


function App() {

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 마우스 휠 스크롤 차단
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(e.key)) {
        e.preventDefault(); // 방향키/스페이스 스크롤 차단
      }
      // 기존 키 이벤트 처리 로직
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="App" onKeyDown={e => e.preventDefault()}>
      <MainPage />
    </div>
  );
}

export default App;
