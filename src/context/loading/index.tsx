import React, { useState, createContext, FC } from 'react'

type LoadingType = {
    loading: boolean
}

type PropsLoadingContext = {
    state: LoadingType,
    setState: React.Dispatch<React.SetStateAction<LoadingType>>
}

const DEFAULT_VALUE = {
    state: {
        loading: false
    },
    setState: () => { }
}
const LoadingContext = createContext<PropsLoadingContext>(DEFAULT_VALUE)

const LoadingContextProvider: FC = ({ children }) => {
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

export { LoadingContextProvider }
export default LoadingContext