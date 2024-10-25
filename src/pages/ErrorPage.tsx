import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";
import {FaTriangleExclamation} from "react-icons/fa6";

const ErrorPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();

    const shown_text = (() => {
        if (isRouteErrorResponse(error)) {
            return error.statusText;
        } else if (error instanceof Error) {
            return error.message;
        }
        return 'Somethin unexpected happened';
    })();

    return (
        <div className='flex text-primary-100 flex-col font-semibold bg-background-600 justify-center items-center h-screen text-3xl'>
            <FaTriangleExclamation className='text-5xl text-primary-400'/>
            <p>Sorry, an error has occurred.</p>
            <p>
                <i>{shown_text}</i>
            </p>

            <button
                onClick={() => navigate('/')}
                className="font-medium text-2xl bg-primary-700 hover:bg-secondary-900 rounded-md px-3 py-2 mt-4"
            >Go To Main Page
            </button>
        </div>
    )
}

export default ErrorPage;
