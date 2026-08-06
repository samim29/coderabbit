import { Navigate, createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Landing from "./features/interview/pages/Landing";
import ShellLayout from "./layouts/ShellLayout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ShellLayout />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "app",
                element: <Protected><Home /></Protected>
            },
            {
                path: "app/interview/:interviewId",
                element: <Protected><Interview /></Protected>
            },
            {
                path: "*",
                element: <Navigate to="/" replace />
            }
        ]
    }
])