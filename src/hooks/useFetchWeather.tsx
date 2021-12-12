import { useState } from "react"
import api from '../services/api'
import { apiConstants } from '../constants/api'
import { weatherResponse, locationResponse } from "../pages/weather/types"

export const useFetchWeather = () => {
    const [data, setData] = useState<weatherResponse>()
    const [loading, setLoading] = useState(true)

    const fetchWeather = (geoLocation: locationResponse) => {
        const setHooks = (_data: weatherResponse, _loading: boolean) => {
            setData(_data)
            setLoading(_loading)
        }

        api.get<weatherResponse>(`/onecall?lat=${geoLocation?.latitude}&lon=${geoLocation?.longitude}&exclude=hourly,daily&appid=${apiConstants.api_key}`).then(res => {
            setHooks(res.data, false)
        }).catch(err => {
            console.log(err)
        })
    }

    return [{ data, loading }, fetchWeather]
}

