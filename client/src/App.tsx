import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth";
import Login from "./components/Login";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

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
