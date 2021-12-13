import React, { useState, createContext, FC } from 'react'

type StateType = {
    loading: boolean,
    language: string
}

type PropsStateContext = {
    state: StateType,
    setState: React.Dispatch<React.SetStateAction<StateType>>
}

const DEFAULT_VALUE = {
    state: {
        loading: false,
        language: 'en'
    },
    setState: () => { }
}
const LoadingContext = createContext<PropsStateContext>(DEFAULT_VALUE)

const StateContextProvider: FC = ({ children }) => {
    const [state, setState] = useState(DEFAULT_VALUE.state)

    return (
        <LoadingContext.Provider
            value={{
                state,
                setState
            }}
        >
            {children}
        </LoadingContext.Provider>
    )

}

export { StateContextProvider }
export default LoadingContext