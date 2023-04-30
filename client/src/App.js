// import index.cs
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Venues from "./components/Venues/Venues";
import NewVibeForm from "./components/NewVibeForm/NewVibeForm";
import VibeChoice from "./components/VibeChoice/VibeChoice";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VibeChoice />} />
        <Route path="/venues/:type" element={<Venues />} />
        <Route path="/new-vibe/:type" element={<NewVibeForm />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
