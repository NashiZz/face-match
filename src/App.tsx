import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LoginPage from "./pages/LoginPage/login";
import Root_page from "./pages/RootPage/Root_page";
import HomePage from "./pages/HomePage/home";
import ProfilePage from "./pages/ProfilePage/profile";
import RegisterPage from "./pages/RegisterPage/register";
import RankingPage from "./pages/RankingPage/rank";
import EditProfilePage from "./pages/ProfilePage/editProfile";
import PicturePage from "./pages/ProfilePage/picture";
import AllUserPage from "./pages/Admin/All_User";
import GraphPage from "./pages/ProfilePage/graph";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root_page />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/edit_profile",
        element: <EditProfilePage />
      },
      {
        path: "/picture",
        element: <PicturePage />
      },
      {
        path: "/graph",
        element: <GraphPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/rank",
        element: <RankingPage />
      },
      {
        path: "/admin_all_user",
        element: <AllUserPage/>
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App
