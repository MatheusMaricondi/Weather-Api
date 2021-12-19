import React, { useState, createContext, FC } from 'react'
import { generalType, geoLocationType } from './types'
import { DEFAULT_VALUE } from './initialValues'

type PropsStateContext = {
    generalState: generalType,
    setGeneralState: React.Dispatch<React.SetStateAction<generalType>>,
    geoState: geoLocationType,
    setGeoState: React.Dispatch<React.SetStateAction<geoLocationType>>,
}

const StateContext = createContext<PropsStateContext>(DEFAULT_VALUE)

const StateContextProvider: FC = ({ children }) => {
    const [generalState, setGeneralState] = useState(DEFAULT_VALUE.generalState)
    const [geoState, setGeoState] = useState(DEFAULT_VALUE.geoState)

    return (
        <StateContext.Provider
            value={{
                generalState,
                setGeneralState,
                geoState,
                setGeoState
            }}
        >
            {children}
        </StateContext.Provider>
    )

}

export { StateContextProvider }
export default StateContext