import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

export const ProfilePage = () => {
  const authContext = useContext(AuthContext);

  const userMail = authContext?.user?.email?.toLocaleUpperCase().split("@")[0];

  return (
    <main>
      <h1>Welcome {userMail} ! </h1>
      <h2>Liked quotes</h2>
    </main>
  );
};
