import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home";
import AddSchedule from "../pages/AddSchedule";
import AllSchedule from "../pages/AllSchedule";
import SignIn from "../pages/SignIn";
import UpdateSchedule from "../components/UpdateSchedule";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/addSchedule",
                element: <AddSchedule></AddSchedule>,
            },
            {
                path: "/allSchedule",
                element: <AllSchedule></AllSchedule>,
                loader: () => fetch("http://localhost:3500/schedules")
            },
            {
                path: "/updateSchedule/:id",
                loader: ({params}) => fetch(`http://localhost:3500/schedules/${params.id}`),
                element: <UpdateSchedule></UpdateSchedule>
            },
            {
                path:"/signIn",
                element: <SignIn></SignIn>
            }
        ]
    }
]);

export default router;