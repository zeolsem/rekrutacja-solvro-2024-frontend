import {useQuery} from "@tanstack/react-query";
import {cocktailQuery} from "../api/queries.tsx";


const CocktailPopup: React.FC<{id:number}> = ({id}) => {
    const { status, data: response, error} = useQuery(cocktailQuery(id));

    if (status === 'pending') {
        return <div className='h-screen fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'>
            <h1 className='text-4xl text-center'>Loading...</h1>
        </div>;
    }
    else if (status === 'error') {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center'>
            <div className='p-5 bg-background-200 text-primary-700 rounded-lg'>
                <h1 className="text-3xl font-bold mb-4">{response.data.name}</h1>
                <h1>{}</h1>
            </div>
        </div>
    )
}

export default CocktailPopup;
