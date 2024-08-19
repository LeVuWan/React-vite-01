import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import UserPage from "./pages/users.jsx";
import ProductPage from "./pages/product.jsx";
import TodoApp from "./components/todos/TodoApp.jsx";
import RegisterPage from "./pages/register.jsx";
import "./style/global.css";
import ErrorPage from "./pages/error.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import { PrivateRoute } from "./pages/private.route.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>

  // </React.StrictMode>
);
