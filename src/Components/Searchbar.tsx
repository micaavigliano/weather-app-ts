import React from 'react';

type Props = {
    handleSubmit: any;
    updateSearchQuery: any;
    getWeatherData: any;
    query: boolean
}

const Searchbar:React.FC<Props> = ({ 
        handleSubmit,
        updateSearchQuery,
        getWeatherData,
        query
    }) => {
    return(
        <>
            <header className="bg-purple-600 text-center bg-opacity-25 text-purple-900">
                <h1 className="font-sans-Roboto text-5xl">Weather finder</h1>
                <form onSubmit={handleSubmit}>
                    <label 
                        htmlFor="city-input"
                        className="font-sans-Roboto text-2xl" 
                        >
                            Ingrese una ciudad para conocer el clima
                        </label>
                    <div className="border-b-2 border-purple-900 w-4/5 m-auto pt-4">
                        <input
                            placeholder="enter a city"
                            className="placeholder-purple-600 w-10/12 h-10 bg-transparent p-4px outline-none text-xl focus:outline-black"
                            id="city-input"
                            onChange={updateSearchQuery}
                        />
                        <button
                            type="submit"
                            className="cursor-pointer w-16 h-10 text-xl focus:outline-black ml-4 font-semibold"
                            aria-label="Click here to search the weather"
                            onClick={getWeatherData}
                        >
                            Search
                        </button>
                    </div>
                </form>
                    {!query ? '' : 
                    (<div className="w-full bg-gray-300 text-center h-10"> 
                        <span 
                        className="text-red-600 font-semibold text-xl"
                        role="log"
                        aria-live="polite"
                         >Nombre inválido. Solo se pueden utilizar carácteres</span>
                    </div>) }
            </header>
        </>
    )
}

export default Searchbar;