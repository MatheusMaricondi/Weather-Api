
type weatherType = {
    id: Number,
    main: string,
    description: string,
    icon: string
}

type currentType = {
    dt: Number,
    sunrise: Number,
    sunset: Number,
    temp: Number,
    pressure: Number,
    humidity: Number,
    clouds: Number,
    weather: weatherType
}

export type weatherResponse = {
    lat: Number,
    lon: Number,
    timezone: string,
    current: currentType
}

export type locationResponse = {
    lat: number,
    lng: number
}