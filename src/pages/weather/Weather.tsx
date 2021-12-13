import { useState, useEffect, useContext } from 'react'
import { weatherResponse, locationResponse } from './types'
import { FaGuilded } from 'react-icons/fa';
import api from '../../services/api'
import { apiConstants } from '../../constants/api'
import StateContext from '../../context/state'

const Weather = () => {
    const { state, setState } = useContext(StateContext)
    const [geoLocation, setGeoLocation] = useState<locationResponse>()
    const [weatherData, setWeatherData] = useState<weatherResponse>()

    useEffect(() => {
        setState({ loading: true, language: state.language })
        navigator.geolocation.getCurrentPosition(local => {
            console.log(local.coords)
            setGeoLocation(local.coords)
        })
    }, [])
    useEffect(() => {
        if (geoLocation)
            fetchWeatherApi()
    }, [geoLocation])

    const fetchWeatherApi = (lang: string = state.language) => {
        console.log(lang)
        api.get<weatherResponse>(`/onecall?lat=${geoLocation?.latitude}&lon=${geoLocation?.longitude}&exclude=hourly,daily&appid=${apiConstants.api_key}&lang=${lang}`).then(res => {
            console.log(res.data)
            setWeatherData(res.data)
            setState({ loading: false, language: state.language })
        }).catch(err => {
            console.log('Get weather fail')
        })
    }

    const changeLanguage = (value: string) => {
        setState({ loading: state.loading, language: value })
        fetchWeatherApi(value)
    }

    return (
        <div>
            <div>
                <select onChange={ev => changeLanguage(ev.target.value)}>
                    <option value={'en'}>Ingles</option>
                    <option value={'pt'}>Portugues</option>
                </select>
            </div>
            Weather {state.loading ? 'LOADING START' : 'LOADING STOP'}
        </div>
    )
}

export default Weather