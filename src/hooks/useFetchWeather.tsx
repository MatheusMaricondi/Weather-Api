import { useState } from "react"
import api from '../services/api'
import { apiConstants } from '../constants/api'
import { weatherResponse, locationResponse } from "../pages/weather/types"

const useFetchWeather = () => {
    const [data, setData] = useState<weatherResponse>()

    const fetchWeather = (geoLocation: locationResponse) => {

        api.get<weatherResponse>(`/onecall?lat=${geoLocation?.latitude}&lon=${geoLocation?.longitude}&exclude=hourly,daily&appid=${apiConstants.api_key}`).then(res => {
            setData(res.data)
        }).catch(err => {
            throw err
        })
    }

    return [{ data }, fetchWeather]
}

export { useFetchWeather }