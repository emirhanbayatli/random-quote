import { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PostsPage } from "./pages/PostsPage";
import { Navbar } from "./components/Navbar";
import { CreateUserPage } from "./pages/CreateUserPage";
import { SignInUserPage } from "./pages/SignInUserPage";

export enum Page {
  home = "Home",
  profile = "Profile",
  postsPage = "PostsPage",
  createUserPage = "createUserPage",
  SignInUserPage = "SignInUserPage",
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.SignInUserPage);

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} pages={Page} />
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:px-8 text-center">
        {currentPage === Page.home && <MainPage />}
        {currentPage === Page.profile && <ProfilePage />}
        {currentPage === Page.postsPage && <PostsPage />}
        {currentPage === Page.createUserPage && (
          <CreateUserPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === Page.SignInUserPage && (
          <SignInUserPage setCurrentPage={setCurrentPage} />
        )}
      </div>
    </>
  );
}
export default App;
