import conditionType from './conditionTypes'

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

export default currentType