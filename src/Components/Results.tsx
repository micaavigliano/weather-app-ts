import React from 'react';
import { WeatherObject } from '../Containers/WeatherCont';
import Forecast from '../Containers/Forecast';

type Props = {
    info: WeatherObject
}

const Results:React.FC<Props> = ({ 
    info
 }) => {
    const { temp, temp_min, temp_max, feels_like, city, icon, title } = info;

    return (
        <>
            <div className="text-center flex flex-row sm:w-full md:w-4/5 lg: w-4/5 h-32 justify-center mx-auto mt-4">
                <div className="flex flex-col w-2/4 text-center">
                    <h2 className="text-3xl font-semibold">{city}</h2>
                    <h3 className="text-3xl font-semibold">{title}</h3>
                    <img 
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`} 
                        alt=""
                        className="m-auto"
                    />
                </div>
                <div className="flex flex-col flex flex-col w-2/4 text-center">
                    <p className="text-xl font-normal">Temperatura actual: {Math.round(temp)} <sup aria-hidden="true">°c</sup></p>
                    <p className="text-xl font-normal">Mínima: {Math.round(temp_min)} <sup aria-hidden="true">°c</sup></p>
                    <p className="text-xl font-normal">Máxima: {Math.round(temp_max)} <sup aria-hidden="true">°c</sup></p>
                    <p className="text-xl font-normal">Sensación térmica: {Math.round(feels_like)} <sup aria-hidden="true">°c</sup></p>
                </div>
            </div>
            <Forecast city={city}/>
        </>
    )
}

export default Results;