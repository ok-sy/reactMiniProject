import "./App.css";
import MainPage from "./pages/MainPage";
function App() {


  return (
    <div className="App" onKeyDown={e => e.preventDefault()}>
      <MainPage />
    </div>
  );
}

export default App;
