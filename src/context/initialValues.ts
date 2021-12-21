import React from 'react'

const DEFAULT_GENERAL_VALUE = {
    loading: false,
    language: navigator.language
}

const DEFAULT_GEO_VALUE = {
}

const DEFAULT_WEATHER_VALUE = {
}

const DEFAULT_LOCATION_VALUE = {

}

export const DEFAULT_VALUE = {
    generalState: DEFAULT_GENERAL_VALUE,
    setGeneralState: () => { },
    geoState: DEFAULT_GEO_VALUE,
    setGeoState: () => { },
    weatherState: DEFAULT_WEATHER_VALUE,
    setWeatherState: () => { }
}

