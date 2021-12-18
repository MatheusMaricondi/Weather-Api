

type conditionType = {
    code: number,
    icon: string,
    text: string
}

type currentType = {
    dt: number,
    sunrise: number,
    sunset: number,
    temp_c: number,
    temp_f: number,
    is_day: number,
    wind_mph: number,
    wind_kph: number
    pressure: number,
    humidity: number,
    cloud: number,
    condition: conditionType,
    feelslike_c: number,
    feelslike_f: number
}

type dayType = {
    maxtemp_c: number,
    maxtemp_f: number,
    mintemp_c: number,
    mintemp_f: number,
    avgtemp_c: number,
    condition: conditionType
}

type forecastDayType = {
    date: string,
    day: dayType
}


type forecastType = {
    forecastDay: forecastDayType[]
}


export type locationType = {
    country: string,
    localtime: Date,
    name: string,
    region: string,
    tz_id: string
}

export type weatherResponse = {
    lat: number,
    lon: number,
    timezone: string,
    current: currentType,
    location: locationType,
    forecast: forecastType
}

export type locationResponse = {
    lat: number,
    lng: number
}

