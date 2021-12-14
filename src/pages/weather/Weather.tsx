import { useState, useEffect, useContext } from 'react'
import { weatherResponse, locationResponse } from './types'
import api from '../../services/api'
import { apiConstants } from '../../constants/api'
import StateContext from '../../context/state'
import styles from './styles.module.scss'
import { Loader } from "@googlemaps/js-api-loader";
import { Select } from 'antd'

const Weather = () => {
    const { state, setState } = useContext(StateContext)
    const [geoLocation, setGeoLocation] = useState<locationResponse>({ latitude: 0, longitude: 0 })
    const [weatherData, setWeatherData] = useState<weatherResponse>()

    let map: google.maps.Map;
    const additionalOptions = {};
    let getItem: any = document.getElementById("map")

    useEffect(() => {
        setState({ loading: true, language: state.language })
        navigator.geolocation.getCurrentPosition(local => {
            console.log(local.coords)
            setGeoLocation(local.coords)
        })
    }, [])
    useEffect(() => {
        if (geoLocation) {
            fetchWeatherApi()
            initMap()
        }
    }, [geoLocation])

    const fetchWeatherApi = (lang: string = state.language) => {
        console.log(lang)

        // api.get<weatherResponse>(`/onecall?lat=${geoLocation?.latitude}&lon=${geoLocation?.longitude}&exclude=hourly,daily&appid=${apiConstants.api_key}&lang=${lang}`).then(res => {
        api.get<weatherResponse>(`/current.json?key=${apiConstants.api_key}&q=${geoLocation?.latitude} ${geoLocation?.longitude}&aqi=no&lang=${lang}`).then(res => {
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

    function initMap(): void {
        const loader = new Loader({
            apiKey: apiConstants.api_maps,
            version: "weekly",
            ...additionalOptions,
        });

        loader.load().then(() => {
            map = new google.maps.Map(getItem, {
                center: { lat: geoLocation?.latitude, lng: geoLocation?.longitude },
                zoom: 8,
            });
        });

    }

    return (
        <div>
            <div className={styles.language_content}>
                <Select defaultValue='en' onChange={changeLanguage}>
                    <option value={'en'}>🇺🇸 Ingles</option>
                    <option value={'pt'}>🇧🇷 Portugues</option>
                </Select>
            </div>
        </div>
    )
}

export default Weather