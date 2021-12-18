import { useState, useEffect, useContext } from 'react'
import { weatherResponse, locationType, staticData } from './types'
import api from '../../services/api'
import { apiConstants } from '../../constants/api'
import StateContext from '../../context/state'
import styles from './styles.module.scss'
import { Select, Descriptions, Card } from 'antd'
import { useMessages } from '../../services/messages'
import { changeLanguageString } from '../../helpers/utils'
import Location from '../location/Location'

const Weather = () => {
    const { state, setState } = useContext(StateContext)
    const [locationData, setLocationData] = useState<locationType>()
    const [staticData, setStaticData] = useState<staticData>()

    const messages = useMessages()

    useEffect(() => {
        if (state.geoLocation.render) {
            fetchWeatherApi()
        }
    }, [state.geoLocation.render])

    const fetchWeatherApi = (lang: string = state.language) => {
        const new_lang = changeLanguageString(lang)
        api.get<weatherResponse>(`/current.json?key=${apiConstants.api_key}&q=${state.geoLocation?.lat} ${state.geoLocation?.lng}&aqi=no&lang=${new_lang}`).then(res => {
            normalizeData(res.data)
            setState({ loading: false, language: lang, geoLocation: state.geoLocation })
        }).catch(err => {
            console.log('Get weather fail')
        })
    }

    const normalizeData = (data: weatherResponse) => {
        const { icon, text } = data.current.condition

        setLocationData(data.location)
        setStaticData({
            icon_url: icon,
            description: text
        })
    }

    const changeLanguage = (value: string) => {
        fetchWeatherApi(value)
    }

    return (
        <div className={styles.content}>
            <div className={styles.language_content}>
                <Location />
                <Descriptions
                    style={{ flexBasis: '40%', marginTop: 50, marginLeft: 70 }}
                    title={messages.get('location.text.title')}
                    bordered
                    column={1}
                >
                    <Descriptions.Item label={messages.get('location.text.name')}>{locationData?.name}</Descriptions.Item>
                    <Descriptions.Item label={messages.get('location.text.localtime')}>{locationData?.localtime}</Descriptions.Item>
                    <Descriptions.Item label={messages.get('location.text.country')}>{locationData?.country}</Descriptions.Item>
                    <Descriptions.Item label={messages.get('location.text.region')}>{locationData?.region}</Descriptions.Item>
                </Descriptions>
                <div className={styles.select_content}>
                    <Select defaultValue={state.language} onChange={changeLanguage}>
                        <option value={'pt-BR'}>🇧🇷 {messages.get('lang.text.pt')}</option>
                        <option value={'en-US'}>🇺🇸 {messages.get('lang.text.en')}</option>
                    </Select>
                </div>
            </div>

            <Card>
                {staticData?.description}
                <img src={staticData?.icon_url} />
            </Card>

        </div>
    )
}

export default Weather