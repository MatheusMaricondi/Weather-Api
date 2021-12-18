import React, { useContext, useEffect } from "react";
import { Card } from "antd";
import StateContext from '../../context/state'
import { useMessages } from '../../services/messages'
import GoogleApiWrapper from '../../components/Maps/Maps'
import styles from './styles.module.scss'

const Location = () => {
    const { state, setState } = useContext(StateContext)
    const messages = useMessages()

    useEffect(() => {
        setState({ loading: true, language: state.language, geoLocation: state.geoLocation })
        navigator.geolocation.getCurrentPosition(local => {
            const geo = {
                lat: local.coords.latitude,
                lng: local.coords.longitude,
                render: true
            }
            setState({ loading: state.loading, language: state.language, geoLocation: geo })
        })
    }, [])

    return (
        <Card
            style={{
                flexBasis: '35%',
                height: '300px',
                marginTop: 5,
                marginLeft: 50,
            }}
            title={messages.get('weather.location')}
            size="small"
            loading={state.loading}
        >
            <GoogleApiWrapper />
        </Card>

    )
}

export default Location