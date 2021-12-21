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

        const new_lang = changeLanguageString(lang)

        const response = await api.get<weatherTypes>(`/forecast.json?key=${apiConstants.api_key}&days=3&q=${lat} ${lng}&aqi=no&lang=${new_lang}`)
        console.log(response.data)
        setGeoState({ lat: response.data.location?.lat, lng: response.data.location?.lon })
        setWeatherState(response.data)
        setGeneralState({ language: lang, loading: false })
        return response
    }

    return { fetchWeatherApi }

}

export default FetchWeatherApiHook
