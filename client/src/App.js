// import index.cs
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Venues from "./components/Venues/Venues";
import NewVibeForm from "./components/NewVibeForm/NewVibeForm";
import VibeChoice from "./components/VibeChoice/VibeChoice";
import Auth from "./components/Auth/Auth";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        showAlert,
        setLoggedIn,
        setShowAlert,
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/vibes" element={<VibeChoice />} />
          <Route path="/venues/:type" element={<Venues />} />
          <Route path="/new-vibe/:type" element={<NewVibeForm />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
