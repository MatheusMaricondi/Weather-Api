import { useState, useEffect, useContext } from 'react'
import { weatherResponse, locationType } from './types'
import api from '../../services/api'
import { apiConstants } from '../../constants/api'
import StateContext from '../../context/state'
import styles from './styles.module.scss'
import { Select, Descriptions, Image } from 'antd'
import { useMessages } from '../../services/messages'
import { changeLanguageString } from '../../helpers/utils'
import Location from '../location/Location'

const Weather = () => {
    const { state, setState } = useContext(StateContext)
    const [locationData, setLocationData] = useState<locationType>()
    const [staticData, setStaticData] = useState<weatherResponse>()

    const messages = useMessages()

    useEffect(() => {
        if (state.geoLocation.render) {
            fetchWeatherApi()
        }
    }, [state.geoLocation.render])

    const fetchWeatherApi = (lang: string = state.language) => {
        const new_lang = changeLanguageString(lang)
        api.get<weatherResponse>(`/forecast.json?key=${apiConstants.api_key}&days=3&q=${state.geoLocation?.lat} ${state.geoLocation?.lng}&aqi=no&lang=${new_lang}`).then(res => {
            console.log(res.data.forecast)
            saveData(res.data)
            setState({ loading: false, language: lang, geoLocation: state.geoLocation })
        }).catch(err => {
            console.log('Get weather fail')
        })
    }

    const saveData = (data: weatherResponse) => {
        setLocationData(data.location)
        setStaticData(data)
    }

    const getData = () => {
        const br_lang = 'pt-BR'
        const checkedData = {
            degrees: state.language == br_lang ? '°C' : '°F',
            temp: state.language == br_lang ? `${staticData?.current?.temp_c}` : `${staticData?.current?.temp_f}`,
            wind: state.language == br_lang ? `${staticData?.current.wind_mph} km/h` : `${staticData?.current.wind_mph}m/h`,
            humidity: `${staticData?.current.humidity}%`,
            feelslike: state.language == br_lang ? `${staticData?.current.feelslike_c} °C` : `${staticData?.current.feelslike_f} °F`
        }

        return checkedData
    }

    const changeLanguage = (value: string) => {
        fetchWeatherApi(value)
    }

    return (
        <div className={styles.content}>
            <div className={styles.select_content}>
                <Select defaultValue={state.language} onChange={changeLanguage}>
                    <option value={'pt-BR'}>🇧🇷 {messages.get('lang.text.pt')}</option>
                    <option value={'en-US'}>🇺🇸 {messages.get('lang.text.en')}</option>
                </Select>
            </div>
            <div className={styles.location_content}>
                <Descriptions
                    style={{ marginTop: 10, alignSelf: 'center', width: '90%' }}
                    title={messages.get('location.text.title')}
                    bordered
                    column={1}
                >
                    <Descriptions.Item label={messages.get('location.text.name')}>{locationData?.name}</Descriptions.Item>
                    <Descriptions.Item label={messages.get('location.text.localtime')}>{locationData?.localtime}</Descriptions.Item>
                    <Descriptions.Item label={messages.get('location.text.country')}>{locationData?.country}</Descriptions.Item>
                    <Descriptions.Item label={messages.get('location.text.region')}>{locationData?.region}</Descriptions.Item>
                </Descriptions>

                <Location />
            </div>

            <div className={styles.current_container}>
                <div className={staticData?.current.is_day ? styles.background_day : styles.background_night}>
                    <div className={styles.current_title}>
                        {messages.get('weather.current.title')}
                    </div>
                    <div className={styles.current_content}>
                        <div className={styles.current_img}>
                            <div>
                                <img src={staticData?.current?.condition?.icon} />
                            </div>
                            <div>{staticData?.current.condition.text}</div>
                        </div>
                        <div className={styles.desc_content}>
                            <div className={styles.temp_container}>
                                <div className={styles.temp}>{getData().temp}</div>
                                <div className={styles.degrees}>{getData().degrees}</div>
                            </div>
                            <div className={styles.current_desc}>
                                <div>{`${messages.get('weather.current.wind')}: ${getData().wind}`}</div>
                                <div>{`${messages.get('weather.current.humidity')}: ${getData().humidity}`}</div>
                                <div>{`${messages.get('weather.current.feelslike')}: ${getData().feelslike}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.current_container}>
                <div className={staticData?.current.is_day ? styles.background_day : styles.background_night}>
                    <div className={styles.current_title}>{messages.get('weather.forecast.title')}</div>
                    <div className={styles.current_content}>
                        <div className={styles.current_img}>
                            <div>
                                <img src={staticData?.current?.condition?.icon} />
                            </div>
                            <div>{staticData?.current.condition.text}</div>
                        </div>
                        {/* <div className={styles.desc_content}>
                            <div className={styles.temp_container}>
                                <div className={styles.temp}>{getData().temp}</div>
                                <div className={styles.degrees}>{getData().degrees}</div>
                            </div>
                            <div className={styles.current_desc}>
                                <div>{`${messages.get('weather.current.wind')}: ${getData().wind}`}</div>
                                <div>{`${messages.get('weather.current.humidity')}: ${getData().humidity}`}</div>
                                <div>{`${messages.get('weather.current.feelslike')}: ${getData().feelslike}`}</div>
                            </div>
                           
                        </div> */}
                        <div className={styles.current_desc}>
                            {staticData?.forecast?.forecastDay?.map(it => (
                                <div>
                                    <div className={styles.temp_container}>
                                        <div className={styles.temp}>{getData().temp}</div>
                                        <div className={styles.degrees}>{getData().degrees}</div>
                                    </div>
                                    <div className={styles.current_desc}>
                                        <div>{`${messages.get('weather.current.wind')}: ${getData().wind}`}</div>
                                        <div>{`${messages.get('weather.current.humidity')}: ${getData().humidity}`}</div>
                                        <div>{`${messages.get('weather.current.feelslike')}: ${getData().feelslike}`}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Weather