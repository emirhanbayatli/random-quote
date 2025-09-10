import { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Navbar } from "./components/Navbar";
import { Pages } from "./components/Navbar";
function App() {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.Home);

  return (
    <>
      <Navbar
        setCurrentPage={setCurrentPage}
        pages={{ [Pages.Home]: {}, [Pages.Profile]: {} }}
      />

      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:px-8 text-center">
        {currentPage === Pages.Home && <MainPage />}
        {currentPage === Pages.Profile && <ProfilePage />}
      </div>
    </>
  );
}
export default App;
