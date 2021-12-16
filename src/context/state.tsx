import React, { useState, createContext, FC } from 'react'

type StateType = {
    loading: boolean,
    language: string,
    geoLocation: {
        lat: number,
        lng: number
    }
}

type PropsStateContext = {
    state: StateType,
    setState: React.Dispatch<React.SetStateAction<StateType>>
}

const DEFAULT_VALUE = {
    state: {
        loading: false,
        language: 'en',
        geoLocation: {
            lat: 0,
            lng: 0
        }
    },
    setState: () => { }
}
const StateContext = createContext<PropsStateContext>(DEFAULT_VALUE)

const StateContextProvider: FC = ({ children }) => {
    const [state, setState] = useState(DEFAULT_VALUE.state)
    console.log('STATE ', state)
    return (
        <StateContext.Provider
            value={{
                state,
                setState
            }}
        >
            {children}
        </StateContext.Provider>
    )

}

export { StateContextProvider }
export default StateContext