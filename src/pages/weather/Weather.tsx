import { useState, useEffect, useContext } from 'react'
import { weatherResponse, locationResponse } from './types'
import api from '../../services/api'
import { apiConstants } from '../../constants/api'
import LoadingContext from '../../context/loading'

const Weather = () => {
    const { state, setState } = useContext(LoadingContext)
    const [geoLocation, setGeoLocation] = useState<locationResponse>()
    const [weatherData, setWeatherData] = useState<weatherResponse>()
    const [toast, setToast] = useState('')

    useEffect(() => {
        setState({ loading: true })
        navigator.geolocation.getCurrentPosition(local => {
            console.log(local.coords)
            setGeoLocation(local.coords)
        })
    }, [])
    useEffect(() => {
        if (geoLocation) {
            api.get<weatherResponse>(`/onecall?lat=${geoLocation?.latitude}&lon=${geoLocation?.longitude}&exclude=hourly,daily&appid=${apiConstants.api_key}`).then(res => {
                console.log(res.data)
                setWeatherData(res.data)
                setState({ loading: false })
            }).catch(err => {
                setToast('Get weather fail')
            })
        }
    }, [geoLocation])

    return (
        <div>
            Weather {state.loading ? 'LOADING START' : 'LOADING STOP'}
        </div>
    )
}

export default Weather