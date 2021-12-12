import { useState, useEffect, useContext } from 'react'
import api from '../../services/api'
import { weatherResponse, locationResponse } from './types'
import { apiConstants } from '../../constants/api'
import { getLocation } from '../../services/getLocation'
import { LoadingProvider } from '../../store/loadingContext'

const Weather = () => {
    const [weatherData, setWeatherData] = useState<weatherResponse>()
    const [location, setLocation] = useState({})

    useEffect(() => {
        console.log(LoadingProvider)
        const response = getLocation()
        setLocation(response)
    }, [])


    return (
        <div>
            Weather {weatherData?.timezone}
        </div>
    )
}

export default Weather