import { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Navbar } from "./components/Navbar";

function App() {
  const pages = {
    home: "Home",
    profile: "Profile",
  };

  const [currentPage, setCurrentPage] = useState(pages.home);

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} pages={pages} />
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:px-8 text-center">
        {currentPage === pages.home && <MainPage />}
        {currentPage === pages.profile && <ProfilePage />}
      </div>
    </>
  );
}
export default App;
