import React, { useState, useEffect, createContext, FC } from 'react'

const defaultState = {
    loading: false
}
const LoadingContext = createContext(defaultState)


export const LoadingProvider: FC = ({ children }) => {
    const [loading, setLoading] = useState(defaultState.loading)

    const changeLoading = () => {
        setLoading(!loading)
    }

    return (
        <LoadingContext.Provider
            value={{
                loading,
                changeLoading
            }}
        >
            {children}
        </LoadingContext.Provider>
    )

}