import React, { useContext } from "react"
import { weatherTypes, fetchWeatherType } from '../../helpers/types/api'
import api from '../api'
import { apiConstants } from '../../constants/api'
import { changeLanguageString } from "../../helpers/utils"
import StateContext from '../../context/state'

const FetchWeatherApiHook = () => {
    const { generalState, setGeneralState, setGeoState, geoState, setWeatherState } = useContext(StateContext)

    const fetchWeatherApi = async (fetchData: fetchWeatherType) => {
        const { lang = generalState.language,
            lat = geoState.lat,
            lng = geoState.lng } = fetchData

        setGeneralState({ language: lang, loading: true })
        const new_lang = changeLanguageString(lang)
        const response = await api.get<weatherTypes>(`/forecast.json?key=${apiConstants.api_key}&days=7&q=${lat} ${lng}&aqi=no&lang=${new_lang}`)
        setGeoState({ lat: response.data.location?.lat, lng: response.data.location?.lon })
        setWeatherState(response.data)
        setGeneralState({ language: lang, loading: false })
        return response
    }

    return { fetchWeatherApi }

}

export default FetchWeatherApiHook
