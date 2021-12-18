
type weatherType = {
    id: number,
    main: string,
    description: string,
    icon: string
}

type conditionType = {
    code: number,
    icon: string,
    text: string
}

type currentType = {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    pressure: number,
    humidity: number,
    clouds: number,
    weather: weatherType,
    condition: conditionType
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
    location: locationType
}

export type locationResponse = {
    lat: number,
    lng: number
}

export type staticData = {
    icon_url?: string,
    description?: string
}
