import React, { useState, useEffect } from 'react';
import { endpoint } from './../endpoint';
import Searchbar from '../Components/Searchbar';
import BuenosAires from '../Components/BuenosAires';
import Results from '../Components/Results';


export type BAObject = {
    temp: number,
    temp_max: number,
    temp_min: number,
    feels_like: number,
    city: string,
    icon: string,
    title: string,
    code: number
}

export type WeatherObject = {
    temp: number,
    temp_max: number,
    temp_min: number,
    feels_like: number,
    city: string,
    icon: string,
    title: string,
    code: number
}

const WeatherCont = () => {
    const API_KEY = "efd8d6ced2474250ccdd802afc57c26e";
    const [query, setQuery] = useState("");
    const [validQuery, setValidQuery] = useState(false);
    const [weather, setWeather] = useState<WeatherObject[]>([]);
    const [ba, setBA] = useState<BAObject>({
        temp: 0,
        temp_min: 0,
        temp_max: 0,
        feels_like: 0,
        city: '',
        icon: '',
        title: '',
        code: 0
    });
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.currentTarget.reset();
    }

    const updateSearchQuery = (event: any) => {
        let valueQuery = event.target.value;
        let valid = validation(valueQuery);
        setQuery(valueQuery);

        if(valid || valueQuery === '') {
            setValidQuery(false);
        } else {
            setValidQuery(true);
        }
    }

    const validation = (query:string) => {
        let regex = /[a-zA-Z]/;
        return regex.test(query)
    }

    //utilizo useEffect para hacer la llamada al endpoint buenosAires para poder utilizar los datos en el elemento estático que va a recibir los datos de dicha ciudad. Uso particularmente useSEffect porque son datos que quiero ver cuando el componente cargue y no cuando realice la llamada. El uso de la async/await es para poder esperar la data de la api, de otro modo me devolvería el componente vacío

    useEffect(() => {
        const getBA = async () => {
            try {
                const url = await endpoint.buenosAires(API_KEY);
                const data = await (await fetch(url)).json();
                console.log(data)
                setBA({
                    temp: data.main.temp,
                    temp_min: data.main.temp_min,
                    temp_max: data.main.temp_max,
                    feels_like: data.main.feels_like,
                    city: data.name,
                    icon: data.weather[0].icon,
                    title: data.weather[0].main,
                    code: data.code
                })
                document.title = 'Weather App';
            } catch(error) {
                alert('error');
            }
        }
        getBA()
    }, []);

    // acá declaro una función getWeatherData. Esta función me va a permitir recibir los datos de la ciudad consultada en el input cuando presione el botón 'search'. Por la misma razón que arriba, utilizo una llamada asincrónica 

    const getWeatherData = async () => {

        try {
            const url = await endpoint.cityWeather(query, API_KEY);
            const data = await (await fetch(url)).json();
            //console.log(data)
            setWeather(
                [
                    ...weather,
                    {
                        temp: data.main.temp,
                        temp_min: data.main.temp_min,
                        temp_max: data.main.temp_max,
                        feels_like: data.main.feels_like,
                        city: data.name,
                        icon: data.weather[0].icon,
                        title: data.weather[0].main,
                        code: data.code
                    }
                ]
            )
            
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <>
            <Searchbar handleSubmit={handleSubmit} updateSearchQuery={updateSearchQuery} getWeatherData={getWeatherData} query={validQuery} />
            <main>
                <section 
                    className="border-4 border-purple-500 border-opacity-100 bg-purple-600 mx-auto sm:w-full md:w-4/5 lg: w-4/5 mt-4 bg-opacity-25 rounded-3xl text-purple-900">
                    <BuenosAires info={ba} />
                </section>
                    {weather.length > 0 && weather.map(value => (
                        <section
                        className="border-4 border-purple-500 border-opacity-100 bg-purple-600 mx-auto sm:w-full md:w-4/5 lg: w-4/5 mt-2 mb-2 bg-opacity-25 rounded-3xl text-purple-900"
                        >
                            <Results key={value.city} info={value} />
                        </section>
                    )
                    )}
            </main>
        </>
    )
}

export default WeatherCont;