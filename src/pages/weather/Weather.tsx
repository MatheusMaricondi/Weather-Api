import { useState, useEffect, useContext } from 'react'
import { Select, Descriptions, Button, Modal, Skeleton } from 'antd'
import { weatherTypes, locationType } from '../../helpers/types/api'
import api from '../../services/api'
import { apiConstants } from '../../constants/api'
import StateContext from '../../context/state'
import styles from './styles.module.scss'
import { useMessages } from '../../services/messages'
import { changeLanguageString } from '../../helpers/utils'
import Location from '../location/Location'
import Forecast from './forecast/Forecast'
import { MdLocationOn } from 'react-icons/md'

const Weather = () => {
    const { generalState, setGeneralState, geoState, setGeoState, setForecastState } = useContext(StateContext)
    const [locationData, setLocationData] = useState<locationType>()
    const [staticData, setStaticData] = useState<weatherTypes>()
    const [locationModal, setLocationModal] = useState(false)

    const messages = useMessages()

    useEffect(() => {
        setGeneralState({ loading: true, language: generalState.language })
        navigator.geolocation.getCurrentPosition(local => {
            setGeoState({
                lat: local.coords.latitude,
                lng: local.coords.longitude,
                render: true
            })
        })
    }, [])

    useEffect(() => {
        if (geoState.render) {
            fetchWeatherApi()
        }
    }, [geoState.render])

    const fetchWeatherApi = (lang: string = generalState.language) => {
        const new_lang = changeLanguageString(lang)

        api.get<weatherTypes>(`/forecast.json?key=${apiConstants.api_key}&days=3&q=${geoState.lat} ${geoState.lng}&aqi=no&lang=${new_lang}`).then(res => {
            console.log(res.data)
            saveData(res.data)
            setGeneralState({ language: lang, loading: false })
        }).catch(err => {
            console.log('Get weather fail')
        })
    }

    const saveData = (data: weatherTypes) => {
        setForecastState({ data: data.forecast, render: true })
        setLocationData(data.location)
        setStaticData(data)

    }

    const getData = () => {
        const { language } = generalState
        const br_lang = 'pt-BR'

        const checkedData = {
            degrees: language == br_lang ? '°C' : '°F',
            temp: language == br_lang ? `${staticData?.current?.temp_c}` : `${staticData?.current?.temp_f}`,
            wind: language == br_lang ? `${staticData?.current.wind_mph}km/h` : `${staticData?.current.wind_mph}m/h`,
            humidity: `${staticData?.current.humidity}%`,
            feelslike: language == br_lang ? `${staticData?.current.feelslike_c}°C` : `${staticData?.current.feelslike_f}°F`
        }

        return checkedData
    }

    const changeLanguage = (value: string) => {
        fetchWeatherApi(value)
    }

    return (
        <div className={styles.content}>
            <div className={styles.select_content}>
                <Select defaultValue={generalState.language} onChange={changeLanguage}>
                    <option value={'pt-BR'}>🇧🇷 {messages.get('lang.text.pt')}</option>
                    <option value={'en-US'}>🇺🇸 {messages.get('lang.text.en')}</option>
                </Select>
            </div>

            <div className={styles.current}>
                <Skeleton className={styles.sk_location_content_lf} loading={generalState.loading} active>
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
                </Skeleton>
                <Skeleton className={styles.sk_location_content_rt} loading={generalState.loading} active>
                    <div className={styles.location_content}>
                        <Descriptions
                            style={{ marginTop: 10, alignSelf: 'center' }}
                            title={messages.get('location.text.title')}
                            bordered
                            column={1}
                            size='small'
                            extra={
                                <div className={styles.show_content}>
                                    <Button type='dashed' onClick={() => setLocationModal(true)} ><MdLocationOn size={23} /></Button>
                                </div>
                            }
                        >
                            <Descriptions.Item label={messages.get('location.text.name')}>{locationData?.name}</Descriptions.Item>
                            <Descriptions.Item label={messages.get('location.text.localtime')}>{locationData?.localtime}</Descriptions.Item>
                            <Descriptions.Item label={messages.get('location.text.country')}>{locationData?.country}</Descriptions.Item>
                            <Descriptions.Item label={messages.get('location.text.region')}>{locationData?.region}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Skeleton>
            </div>
            <Forecast />
            <Modal
                title={messages.get('weather.location')}
                visible={locationModal}
                width={700}
                onOk={() => setLocationModal(false)}
            >
                <Location />
            </Modal>
        </div>
    )
}

export default Weather