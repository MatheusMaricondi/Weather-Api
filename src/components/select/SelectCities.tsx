import React, { useState, useEffect, useContext } from "react";
import { Select } from "antd";
import { citiesType } from '../../helpers/types/state'
import { useMessages } from "../../services/messages";
import jsonCitiesFile from '../../helpers/cities.json'
import fetchWeatherApiHook from '../../services/hooks/FetchWeatherApiHook'
import StateContext from '../../context/state'



const SelectCities = () => {
    const messages = useMessages()
    const [jsonCities, setJsonCities] = useState<any[]>()
    const [options, setOptions] = useState<any>()
    const { generalState, setGeneralState } = useContext(StateContext)
    const { fetchWeatherApi } = fetchWeatherApiHook()


    useEffect(() => {
        const stringifiedCitiesJson = JSON.stringify(jsonCitiesFile)
        const parsedCitiesJson = JSON.parse(stringifiedCitiesJson)
        const tempOptions: any = []

        setJsonCities(parsedCitiesJson)
        parsedCitiesJson.forEach((city: citiesType) => {
            tempOptions.push({
                value: city.name,
                disabled: false,
            })
        })
        setOptions(tempOptions)
    }, [])

    const handleSelect = (value: any) => {
        setGeneralState({ loading: true, language: generalState.language })
        const city: citiesType = jsonCities?.find((city: citiesType) => city.name == value)
        fetchWeatherApi({ lat: city.lat, lng: city.lng })
    }

    return (
        <Select
            loading={generalState.loading}
            showSearch
            placeholder={messages.get('forecast.search.placeholder')}
            onSelect={(value: any) => handleSelect(value)}
            options={options}
            style={{
                margin: '20px',
                width: '40%',
                alignSelf: 'center'
            }}
        />
    )
}

export default SelectCities