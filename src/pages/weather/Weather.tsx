import { useState, useEffect, useContext } from 'react'
import { Select, Descriptions, Button, Modal, Skeleton, Space } from 'antd'
import StateContext from '../../context/state'
import styles from './styles.module.scss'
import { useMessages } from '../../services/messages'
import { MdLocationOn, MdRefresh } from 'react-icons/md'
import Location from '../../components/location/Location'
import Forecast from '../../components/forecast/Forecast'
import SelectCities from '../../components/select/SelectCities'
import { FetchWeatherApiHook, GetGeolocationHook } from '../../services/hooks'


const Weather = () => {
    const { generalState, setGeneralState, geoState, weatherState } = useContext(StateContext)
    const [locationModal, setLocationModal] = useState(false)
    const { fetchWeatherApi } = FetchWeatherApiHook()
    const { getGeolocation } = GetGeolocationHook()

    const messages = useMessages()

    useEffect(() => {
        setGeneralState({ loading: true, language: generalState.language })
        getGeolocation()
    }, [])

    useEffect(() => {
        if (geoState.render) {
            fetchWeatherApi({})
        }
    }, [geoState.render])

    const getData = () => {
        const { language } = generalState
        const br_lang = 'pt-BR'

        const checkedData = {
            degrees: language == br_lang ? '°C' : '°F',
            temp: language == br_lang ? `${weatherState?.current?.temp_c}` : `${weatherState?.current?.temp_f}`,
            wind: language == br_lang ? `${weatherState?.current?.wind_mph}km/h` : `${weatherState?.current?.wind_mph}m/h`,
            humidity: `${weatherState?.current?.humidity}%`,
            feelslike: language == br_lang ? `${weatherState?.current?.feelslike_c}°C` : `${weatherState?.current?.feelslike_f}°F`
        }

        return checkedData
    }

    const changeLanguage = (value: string) => {
        fetchWeatherApi({ lang: value })
    }

    const handleRefresh = () => {
        setGeneralState({ loading: true, language: generalState.language })
        getGeolocation()
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
                        <div className={weatherState?.current?.is_day ? styles.background_day : styles.background_night}>
                            <div className={styles.current_title}>
                                {messages.get('weather.current.title')}
                            </div>
                            <div className={styles.current_content}>
                                <div className={styles.current_img}>
                                    <div>
                                        <img src={weatherState?.current?.condition?.icon} />
                                    </div>
                                    <div>{weatherState?.current?.condition.text}</div>
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
                                    <Space>
                                        <Button type='dashed' onClick={() => setLocationModal(true)} ><MdLocationOn size={23} /></Button>
                                        <Button type='default' onClick={() => handleRefresh()} ><MdRefresh size={23} /></Button>
                                    </Space>
                                </div>
                            }
                        >
                            <Descriptions.Item label={messages.get('location.text.name')}>{weatherState.location?.name}</Descriptions.Item>
                            <Descriptions.Item label={messages.get('location.text.localtime')}>{weatherState.location?.localtime}</Descriptions.Item>
                            <Descriptions.Item label={messages.get('location.text.country')}>{weatherState.location?.country}</Descriptions.Item>
                            <Descriptions.Item label={messages.get('location.text.region')}>{weatherState.location?.region}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Skeleton>
            </div>
            <SelectCities />
            <Forecast />
            <Modal
                title={messages.get('weather.location')}
                visible={locationModal}
                width={700}
                okButtonProps={{}}
                onCancel={() => setLocationModal(false)}
                onOk={() => setLocationModal(false)}
                keyboard
                okText={messages.get('common.buttom.close')}
                cancelButtonProps={{ style: { display: 'none' } }}
                okType='link'
            >
                <Location />
            </Modal>
        </div>
    )
}

export default Weather