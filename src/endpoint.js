//Creo una función endpoint y adentro le paso objetos que a su vez son funciones que requieren una key. Tomé la decisión de manejar las URLs de la API de esta manera porque me pareció la manera más ordenada, clara y segura.

export const endpoint = {
    cityWeather: (query, apiKey) => `https://api.openweathermap.org/data/2.5/weather/?q=${query}&units=metric&APPID=${apiKey}`,
    forecast: (code, apiKey) => `https://api.openweathermap.org/data/2.5/forecast?q=${code}&units=metric&APPID=${apiKey}`,
    buenosAires: (apiKey) => `https://api.openweathermap.org/data/2.5/weather/?q=Buenos Aires&units=metric&APPID=${apiKey}`
}