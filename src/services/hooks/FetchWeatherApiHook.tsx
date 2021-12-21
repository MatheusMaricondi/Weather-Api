import React, { useContext, useState } from "react"
import { weatherTypes } from '../../helpers/types/api'
import api from '../api'
import { apiConstants } from '../../constants/api'
import { changeLanguageString } from "../../helpers/utils"
import StateContext from '../../context/state'

const FetchWeatherApiHook = () => {
    const { generalState, setGeneralState, geoState, setForecastState } = useContext(StateContext)
    // const [data, setData] = useState<weatherTypes>()

    const fetchWeatherApi = async (lang: string = generalState.language, lat: number = geoState.lat, lng: number = geoState.lng) => {
        const new_lang = changeLanguageString(lang)

        const response = await api.get<weatherTypes>(`/forecast.json?key=${apiConstants.api_key}&days=3&q=${lat} ${lng}&aqi=no&lang=${new_lang}`)

        setForecastState({ data: response.data.forecast, render: true })
        setGeneralState({ language: lang, loading: false })
        return response

    }

    return { fetchWeatherApi }

}

export default FetchWeatherApiHook


