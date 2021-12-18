import React, { useState, createContext, FC } from 'react'

type StateType = {
    loading: boolean,
    language: string,
    geoLocation: {
        lat: number,
        lng: number,
        render: boolean
    }
}

type PropsStateContext = {
    state: StateType,
    setState: React.Dispatch<React.SetStateAction<StateType>>
}

const DEFAULT_VALUE = {
    state: {
        loading: false,
        language: navigator.language,
        geoLocation: {
            lat: 0,
            lng: 0,
            render: false
        }
    },
    setState: () => { }
}
const StateContext = createContext<PropsStateContext>(DEFAULT_VALUE)

const StateContextProvider: FC = ({ children }) => {
    const [state, setState] = useState(DEFAULT_VALUE.state)
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