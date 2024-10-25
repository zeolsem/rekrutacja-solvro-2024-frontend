/**
 * A banner for HomePage
 */
export const Hero = () => {
    return (
        <div
            className='flex mt-0 m-2 flex-col w-full text-secondary-100 font-semibold p-4 bg-background-600 items-center justify-center'
        >
            <h1 className='text-5xl text-center mt-8 mb-5'>Welcome to your personal barman assistant!</h1>
            <h1 className='text-2xl mb-4'>This is where all the drinks from our vast knowledge base are available for you to see and learn how to make them!</h1>
            <a className='text-2xl text-primary-500 underline' href="https://github.com/zeolsem/rekrutacja-solvro-2024-frontend">Source Code</a>
            <h1 className='text-center'>Made by szolim</h1>
        </div>
    )
}