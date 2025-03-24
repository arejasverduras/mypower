
export const ErrorItem = ({error}:{error:string}) => {
    if (!error) return null;

    return (
        <div className="flex justify-center sm:justify-start w-full">
        <div className="relative w-full sm:w-auto text-white p-4 mx-4 bg-red-500 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.5)] shadow-red-900">
            {error}
            <span className="absolute -top-2 right-2 transform translate-x-1/2 bg-red-500 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.5)] shadow-red-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M12 5a7 7 0 110 14 7 7 0 010-14z" />
            </svg>
            </span>
        </div>
    </div>
    )
};
