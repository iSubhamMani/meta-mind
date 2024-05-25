import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth";
import Login from "./components/Login";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import NewPost from "./components/NewPost";
import PostDetails from "./components/PostDetails";
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/new-post",
          element: <NewPost />,
        },
        {
          path: "/post/:id",
          element: <PostDetails />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return (
    <div>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
