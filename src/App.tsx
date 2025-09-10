import { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PostsPage } from "./pages/PostsPage";
import { Navbar } from "./components/Navbar";

function App() {
  enum Page {
    home = "Home",
    profile = "Profile",
    postsPage = "PostsPage",
  }

  const [currentPage, setCurrentPage] = useState<Page>(Page.home);

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} pages={Page} />
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:px-8 text-center">
        {currentPage === Page.home && <MainPage />}
        {currentPage === Page.profile && <ProfilePage />}
        {currentPage === Page.postsPage && <PostsPage />}
      </div>
    </>
  );
}
export default App;
