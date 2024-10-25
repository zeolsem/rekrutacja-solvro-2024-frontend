import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import CocktailsPage from "./pages/CocktailsPage.tsx";
import {CocktailLoader} from "./loaders/CocktailLoader.tsx";
import {FavoritesContextProvider} from "./contexts/FavoritesContext.tsx";
import CocktailsSearchPage from "./pages/CocktailsSearchPage.tsx";
import CocktailsFilteredPage from "./pages/CocktailsFilteredPage.tsx";

/**
 * App, the routing is handled in here.
 * @constructor
 */
function App() {
    const router=createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout /> } errorElement={<ErrorPage />}>
                <Route index element={<HomePage />}/>
                <Route path='/cocktails/:page' element={<CocktailsPage />} loader={CocktailLoader}/>
                <Route path='/cocktails/search/:query/:page' element={<CocktailsSearchPage />} loader={CocktailLoader}/>
                <Route path='/cocktails/filter/:query/:page' element={<CocktailsFilteredPage />} loader={CocktailLoader}/>
            </Route>
        )
    );

    return (
        <FavoritesContextProvider>
            <RouterProvider router={router} />
        </FavoritesContextProvider>
    );
}

export default App
