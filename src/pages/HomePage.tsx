import {useQuery} from "@tanstack/react-query";
import {fetchCocktails} from "../api/cocktailsAPI.tsx";

const HomePage: React.FC = () => {
    const cocktails = useQuery({
        queryKey: ["cocktails"],
        queryFn: fetchCocktails,
    });

    if (cocktails.isLoading) {
        return <div>Loading...</div>;
    }
    else if (cocktails.isError) {
        return <div>Error</div>
    }

    return (
        <div>n</div>
    )
}

export default HomePage;