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
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Navbar setCurrentPage={setCurrentPage} pages={pages} />
      {currentPage === pages.home && <MainPage />}
      {currentPage === pages.profile && <ProfilePage />}
    </div>
  );
}
export default App;
