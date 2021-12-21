import React, { useState, createContext, FC } from 'react'
import { generalType, geoLocationType } from '../helpers/types/state'
import { forecastType, weatherTypes } from '../helpers/types/api'
import { DEFAULT_VALUE } from './initialValues'

type PropsStateContext = {
    generalState: generalType,
    setGeneralState: React.Dispatch<React.SetStateAction<generalType>>,
    geoState: geoLocationType,
    setGeoState: React.Dispatch<React.SetStateAction<geoLocationType>>,
    weatherState: weatherTypes,
    setWeatherState: React.Dispatch<React.SetStateAction<weatherTypes>>,
}

const StateContext = createContext<PropsStateContext>(DEFAULT_VALUE)

const StateContextProvider: FC = ({ children }) => {
    const [generalState, setGeneralState] = useState(DEFAULT_VALUE.generalState)
    const [geoState, setGeoState] = useState(DEFAULT_VALUE.geoState)
    const [weatherState, setWeatherState] = useState(DEFAULT_VALUE.weatherState)

    return (
        <StateContext.Provider
            value={{
                generalState,
                setGeneralState,
                geoState,
                setGeoState,
                weatherState,
                setWeatherState
            }}
        >
            {children}
        </StateContext.Provider>
    )

}

export { StateContextProvider }
export default StateContext