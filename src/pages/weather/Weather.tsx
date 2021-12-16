import { useState, useEffect, useContext, useRef } from 'react'
import { weatherResponse, locationResponse } from './types'
import api from '../../services/api'
import { apiConstants } from '../../constants/api'
import StateContext from '../../context/state'
import styles from './styles.module.scss'
import { Select, Card } from 'antd'
import GoogleApiWrapper from '../../components/Maps/Maps'
import { useMessages } from '../../services/messages'

const Weather = () => {
    const { state, setState } = useContext(StateContext)
    const [weatherData, setWeatherData] = useState<weatherResponse>()
    const [renderMap, setRenderMap] = useState(false)
    const messages = useMessages()

    useEffect(() => {
        setState({ loading: true, language: state.language, geoLocation: state.geoLocation })
        navigator.geolocation.getCurrentPosition(local => {
            const geo = {
                lat: local.coords.latitude,
                lng: local.coords.longitude
            }
            setState({ loading: state.loading, language: state.language, geoLocation: geo })
            setRenderMap(true)
        })
    }, [])
    useEffect(() => {
        if (renderMap) {
            fetchWeatherApi()
        }
    }, [renderMap])

    const fetchWeatherApi = (lang: string = state.language) => {
        api.get<weatherResponse>(`/current.json?key=${apiConstants.api_key}&q=${state.geoLocation?.lat} ${state.geoLocation?.lng}&aqi=no&lang=${lang}`).then(res => {
            setWeatherData(res.data)
            setState({ loading: false, language: lang, geoLocation: state.geoLocation })
        }).catch(err => {
            console.log('Get weather fail')
        })
    }

    const changeLanguage = (value: string) => {
        fetchWeatherApi(value)
    }

    return (
        <div>
            <div className={styles.language_content}>
                <div className={styles.select_content}>
                    <Select defaultValue='en' onChange={changeLanguage}>
                        <option value={'en'}>🇺🇸 {messages.get('lang.text.en')}</option>
                        <option value={'pt'}>🇧🇷 {messages.get('lang.text.pt')}</option>
                    </Select>
                </div>

                <Card
                    style={{ width: '70%', height: '500px', marginTop: 5 }}
                    title={messages.get('weather.location')}
                    size="small"
                    loading={state.loading}
                >
                    <GoogleApiWrapper></GoogleApiWrapper>
                </Card>
                <div></div>
            </div>


        </div>
    )
}

export default Weather