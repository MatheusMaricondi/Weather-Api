import { useState, useEffect, useContext } from 'react'
import { weatherResponse, locationResponse } from './types'
import LoadingContext from '../../context/loading'
import { useFetchWeather } from '../../hooks/useFetchWeather'


const Weather = () => {
    // const [weatherData, fetchWeather] = useFetchWeather()
    const { state, setState } = useContext(LoadingContext)

    useEffect(() => {
        setState({ loading: true })
        navigator.geolocation.getCurrentPosition(local => {
            console.log(local.coords)
            setState({ loading: false })
        })
    }, [])


    return (
        <div>
            Weather {state.loading ? 'LOADING START' : 'LOADING STOP'}
        </div>
    )
}

export default Weather