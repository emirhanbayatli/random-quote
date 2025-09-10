import "./App.css";
import { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Navbar } from "./Components/Navbar";

function App() {
  const pages = {
    home: "Home",
    profile: "Profile",
  };

  const [currentPage, setCurrentPage] = useState(pages.home);

  return (
    <div className="App">
      <Navbar setCurrentPage={setCurrentPage} pages={pages} />
      {currentPage === pages.home && <MainPage />}
      {currentPage === pages.profile && <ProfilePage />}
    </div>
  );
}
export default App;
