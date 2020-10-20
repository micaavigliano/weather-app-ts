import React, { useState, useEffect } from 'react';
import { endpoint } from '../endpoint';
import moment from 'moment';

type Props = {
    city: string
}

export type WeatherObject = {
    temp: number,
    img: string,
    city: string,
    icon: string,
    day: string,
    weather: string
}

const Forecast:React.FC<Props>  = ({ city }) => {
    const API_KEY = "efd8d6ced2474250ccdd802afc57c26e";
    const [forecast, setForecast] = useState<WeatherObject[]>([]);
    const [temp, setTemp] = useState<WeatherObject[]>([])

    useEffect(() => {
        const getForecast = async () => {
            try {
                const res = await fetch(
                    endpoint.forecast(city, API_KEY)
                );
                const data = await res.json();
                //console.log(data.list)
                setForecast(data.list);
            } catch(err) {
                console.log(err)
            }
        } 
        getForecast();
    }, [city]);

    useEffect(() => {
        const formatTemperature = () => {
            if(!forecast) return;
            let data = forecast?.reduce((acc:any, value:any) => {
                acc[moment(value.dt_txt).format("dddd")] = acc[moment(value.dt_txt).format("dddd")] === undefined ? ({
                    [moment(value.dt_txt).format("dddd")] : 
                    {
                        temp: value.main.temp,
                        img: value.weather[0].icon,
                        day: moment(value.dt_txt).format("dddd"),
                        weather: value.weather[0].main
                    }}) : ({
                        temp: value.main.temp,
                        img: value.weather[0].icon,
                        day: moment(value.dt_txt).format("dddd"),
                        weather: value.weather[0].main
                })
                return acc;
            }, {})
            //console.log(data);
            setTemp(data);
            return data;
        }
        formatTemperature()
    }, [forecast]);

    return (
        <>
        {
            forecast ? (
                <div className="text-center flex flex-col w-4/5 justify-center mx-auto pt-8">
                    <p className="text-2xl font-semibold">Pronóstico extendido</p>
                    <div className="w-full flex flex-row justify-center justify-around pb-8">
                    {
                        temp && Object.values(temp).map(value => (
                         <div className="w-1/4 text-center pt-6">
                            <p className="text-center font-semibold">{value.day}</p>
                            <p className="text-center font-semibold">{Math.round(value.temp)}<sup aria-hidden="true">°c</sup></p>
                            <p className="font-semibold">{value.weather}</p>
                            <img 
                                src={`http://openweathermap.org/img/wn/${value.img}@2x.png`} 
                                alt="" 
                                className="m-auto"
                            />
                        </div>
                        ))
                    }
                    </div>
                </div>
            ) : (
                <p className="bg-purple-400 text-center flex flex-col w-4/5 justify-center mx-20"> Loading</p>
            )
        }
        </>
    )
}

export default Forecast;