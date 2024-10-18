import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {
    const router=createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout /> } errorElement={<ErrorPage />}>
                <Route index element={<HomePage />}/>
            </Route>
        )
    );

    return <RouterProvider router={router} />
}

export default App
